const router = require("express").Router();

const {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} = require("../controllers/quizzesController");

router
  .route("/:courseId/:quizId")
  .get(getQuiz)
  .patch(updateQuiz)
  .delete(deleteQuiz);
router.route("/:courseId/:quizId/submit").post(submitQuiz);
router.route("/:courseId").post(createQuiz);

module.exports = router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Quiz:
 *       type: object
 *       required:
 *         - title
 *         - questions
 *         - courseId
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the quiz.
 *           example: "Math Quiz"
 *         questions:
 *           type: array
 *           description: The list of questions in the quiz.
 *           items:
 *             type: object
 *             properties:
 *               questionTitle:
 *                 type: string
 *                 description: The question title.
 *                 example: "What is 2 + 2?"
 *               answers:
 *                 type: array
 *                 description: The list of possible answers for the question.
 *                 items:
 *                   type: string
 *                   example: "3"
 *               correctAnswer:
 *                 type: string
 *                 description: The correct answer for the question.
 *                 example: "4"
 *         courseId:
 *           type: string
 *           description: The course associated with the quiz (referencing the Course model).
 *           example: "60b8c7d1f1a7d7c3d8f5d5d3"
 *         duration:
 *           type: number
 *           description: The duration of the quiz in minutes.
 *           example: 30
 *         submittedAnswers:
 *           type: array
 *           description: List of answers submitted by users for this quiz.
 *           items:
 *             type: object
 *             properties:
 *               submittedAnswers:
 *                 type: array
 *                 description: The list of answers submitted by the user.
 *                 items:
 *                   type: string
 *                   example: "4"
 *               userId:
 *                 type: string
 *                 description: The user who submitted the answers.
 *                 example: "60b8c7d1f1a7d7c3d8f5d5d4"
 *               submitDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the quiz was submitted.
 *                 example: "2024-11-12T12:00:00Z"
 *               score:
 *                 type: number
 *                 description: The score the user received for the quiz submission.
 *                 example: 80
 *       example:
 *         title: "Math Quiz"
 *         questions:
 *           - questionTitle: "What is 2 + 2?"
 *             answers: ["3", "4", "5"]
 *             correctAnswer: "4"
 *         courseId: "60b8c7d1f1a7d7c3d8f5d5d3"
 *         duration: 30
 *         submittedAnswers:
 *           - submittedAnswers: ["4"]
 *             userId: "60b8c7d1f1a7d7c3d8f5d5d4"
 *             submitDate: "2024-11-12T12:00:00Z"
 *             score: 80
 */

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Quiz management operations
 */

/**
 * @swagger
 * /quizzes/{courseId}/{quizId}:
 *   get:
 *     summary: Get a quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the quiz belongs
 *         schema:
 *           type: string
 *       - name: quizId
 *         in: path
 *         required: true
 *         description: The ID of the quiz to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 duration:
 *                   type: number
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       questionTitle:
 *                         type: string
 *                       answers:
 *                         type: array
 *                         items:
 *                           type: string
 *                       correctAnswer:
 *                         type: string
 *                 courseId:
 *                   type: string
 *       404:
 *         description: No quiz found with this ID
 */

/**
 * @swagger
 * /quizzes/{courseId}:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the quiz will belong
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               duration:
 *                 type: number
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionTitle:
 *                       type: string
 *                     answers:
 *                       type: array
 *                       items:
 *                         type: string
 *                     correctAnswer:
 *                       type: string
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 duration:
 *                   type: number
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       questionTitle:
 *                         type: string
 *                       answers:
 *                         type: array
 *                         items:
 *                           type: string
 *                       correctAnswer:
 *                         type: string
 *                 courseId:
 *                   type: string
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Course not found
 */

/**
 * @swagger
 * /quizzes/{courseId}/{quizId}:
 *   patch:
 *     summary: Update a quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the quiz belongs
 *         schema:
 *           type: string
 *       - name: quizId
 *         in: path
 *         required: true
 *         description: The ID of the quiz to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               duration:
 *                 type: number
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionTitle:
 *                       type: string
 *                     answers:
 *                       type: array
 *                       items:
 *                         type: string
 *                     correctAnswer:
 *                       type: string
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Quiz or course not found
 *       403:
 *         description: Not authorized to update this quiz
 */

/**
 * @swagger
 * /quizzes/{courseId}/{quizId}:
 *   delete:
 *     summary: Delete a quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the quiz belongs
 *         schema:
 *           type: string
 *       - name: quizId
 *         in: path
 *         required: true
 *         description: The ID of the quiz to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 *       403:
 *         description: Not authorized to delete this quiz
 */

/**
 * @swagger
 * /quizzes/{courseId}/{quizId}/submit:
 *   post:
 *     summary: Submit answers for a quiz
 *     tags: [Quizzes]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the quiz belongs
 *         schema:
 *           type: string
 *       - name: quizId
 *         in: path
 *         required: true
 *         description: The ID of the quiz to submit answers for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               submittedAnswers:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Quiz submitted successfully"
 *                 quiz:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     submittedAnswers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           submittedAnswers:
 *                             type: array
 *                             items:
 *                               type: string
 *                           submitDate:
 *                             type: string
 *                             format: date-time
 *                           userId:
 *                             type: string
 *                           score:
 *                             type: number
 *       400:
 *         description: Invalid submitted answers
 *       404:
 *         description: Quiz not found
 *       403:
 *         description: Not enrolled in this course
 */
