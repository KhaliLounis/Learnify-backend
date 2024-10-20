const Assignment = require("../models/Assignment");
const Course = require("../models/Course");
const User = require("../models/User");
const uploadDocument = require("../utils/upload");
const createAssignment = async (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !dueDate) {
    return res
      .status(400)
      .json({ message: "Please provide the assignment's title and due date " });
  }
  const { courseId } = req.params;
  const { userId } = req.user;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (course.instructorId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Only the course instructor can add assignments" });
  }
  const assignment = await Assignment.create({
    title,
    description,
    dueDate,
    courseId,
  });
  course.assignmentIds.push(assignment._id);
  await course.save();
  return res.status(201).json(assignment);
};

const getAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  const assignment = await Assignment.findById(assignmentId)
    .populate("courseId")
    .populate("submittedFiles.userId");

  if (!assignment) {
    return res.status(404).json({ message: "Assigment not found" });
  }
  return res.status(200).json(assignment);
};
const updateAssignment = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const { courseId, assignmentId } = req.params;
  const { userId } = req.user;

  if (!title || !dueDate) {
    return res
      .status(400)
      .json({ message: "Please provide the assignment's title and due date " });
  }
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (course.instructorId.toString() !== userId) {
    return res.status(403).json({
      message: "Only the course instructor can update this assignment",
    });
  }
  const assignment = await Assignment.findByIdAndUpdate(
    assignmentId,
    { title, description, dueDate },
    { new: true, runValidators: true }
  );

  res.status(200).json({ message: "Assignment updated successfully" });
};
const deleteAssignment = async (req, res) => {
  const { courseId, assignmentId } = req.params;
  const { userId } = req.user;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (course.instructorId.toString() !== userId) {
    return res.status(403).json({
      message: "Only the course instructor can delete this assignment",
    });
  }
  const assignment = await Assignment.findByIdAndDelete(assignmentId);

  res.status(200).json({ message: "Assignment deleted successfully" });
};
const submitAssignment = async (req, res) => {
  const { courseId, assignmentId } = req.params;
  const { userId } = req.user;
  const submitDate = Date.now();
  const assignment = await Assignment.findById(assignmentId);
  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }
  const user = await User.findById(userId);
  if (!user.joinedCourses.includes(courseId)) {
    return res
      .status(403)
      .json({ message: "You are not enrolled in this course" });
  }
  let fileUrl;
  if (req.files && req.files.documents) {
    try {
      fileUrl = await uploadDocument(req.files.documents);
    } catch (error) {
      return res.status(500).json({ message: "Couldn't upload your document" });
    }
  }
  assignment.submittedFiles.push({ fileUrl, userId, submitDate });
  await assignment.save();
  return res.status(200).json({ message: "Assignment submitted successfully" });
};

module.exports = {
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
};
