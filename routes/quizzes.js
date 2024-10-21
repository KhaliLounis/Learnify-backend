const router = require("express").Router();

const {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} = require("../controllers/quizzesController");

router.route("/:courseId/:quizId").get(getQuiz).patch(updateQuiz).delete(deleteQuiz);
router.route("/:courseId/:quizId/submit").post(submitQuiz);
router.route("/:courseId").post(createQuiz);

module.exports = router;

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
