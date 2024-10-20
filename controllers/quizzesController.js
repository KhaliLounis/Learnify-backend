const Quiz = require("../models/Quiz");
const Course = require("../models/Course");
const User = require("../models/User");
const getQuiz = async (req, res) => {
  const { quizId } = req.params;
  const quiz = await Quiz.findById(quizId).populate("courseId");
  if (!quiz) {
    return res.status(404).json({ message: "No quiz found with this id" });
  }
  return res.status(200).json(quiz);
};

const createQuiz = async (req, res) => {
  const { userId } = req.user;
  const { title, duration, questions } = req.body;
  const { courseId } = req.params;
  if (
    !title ||
    !duration ||
    !Array.isArray(questions) ||
    questions.length === 0
  ) {
    return res.status(400).json({
      message: "Please provide the quiz's title, duration and questions",
    });
  }
  for (const question of questions) {
    if (
      !question.questionTitle ||
      !Array.isArray(question.answers) ||
      question.answers.length === 0 ||
      !question.answers.includes(question.correctAnswer)
    ) {
      return res.status(400).json({
        message:
          "Each question must have a title, a non-empty answers array, and the correct answer must be one of the provided answers.",
      });
    }
  }
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "No course found with this id" });
  }
  if (course.instructorId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Only the course instructor can create quizzes" });
  }
  const quiz = await Quiz.create({ title, questions, courseId, duration });
  return res.status(201).json(quiz);
};
const updateQuiz = async (req, res) => {
  const { quizId, courseId } = req.params;
  const { userId } = req.user;
  const { title, duration, questions } = req.body;
  if (
    !title ||
    !duration ||
    !Array.isArray(questions) ||
    questions.length === 0
  ) {
    return res.status(400).json({
      message: "Please provide the quiz's title, duration and questions",
    });
  }
  for (const question of questions) {
    if (
      !question.questionTitle ||
      !Array.isArray(question.answers) ||
      question.answers.length === 0 ||
      !question.answers.includes(question.correctAnswer)
    ) {
      return res.status(400).json({
        message:
          "Each question must have a title, a non-empty answers array, and the correct answer must be one of the provided answers.",
      });
    }
  }
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "No course found with this id" });
  }
  if (course.instructorId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Only the course instructor can create quizzes" });
  }
  await Quiz.findByIdAndUpdate({ title, questions, courseId, duration });
  return res.status(201).json({ message: "Course updated successfully" });
};
const deleteQuiz = async (req, res) => {
  const { courseId, quizId } = req.params;
  const { userId } = req.user;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (course.instructorId.toString() !== userId) {
    return res.status(403).json({
      message: "Only the course instructor can delete this quiz",
    });
  }
  const quiz = await Quiz.findByIdAndDelete(quizId);

  res.status(200).json({ message: "quiz deleted successfully" });
};
const submitQuiz = async (req, res) => {
  const { userId } = req.user;
  const { submittedAnswers } = req.body;
  const { quizId, courseId } = req.params;
  const submitDate = Date.now();
  if (!submittedAnswers) {
    return res
      .status(400)
      .josn({ message: "please provide the submitted answer" });
  }
  const quiz = await Quiz.findById(quizId);
  if (!quiz) {
    return res.status(404).json({ message: "No quiz was found with this id" });
  }

  const user = await User.findById(userId);
  if (!user.joinedCourses.includes(courseId)) {
    return res
      .status(403)
      .json({ message: "You are not enrolled in this course " });
  }
  const questions = quiz.questions;
  let score = 0;
  let i = 0;
  for (const question of questions) {
    if (question.correctAnswer === submittedAnswers[i]) {
      score += 1;
    }
    i += 1;
  }
  quiz.submittedAnswers.push({
    submittedAnswers,
    submitDate,
    userId: user._id,
    score,
  });
  await quiz.save();
  return res.status(200).json({ message: "Quiz submitted successfully", quiz });
};

module.exports = {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
};
