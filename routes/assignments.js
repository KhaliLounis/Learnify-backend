const router = require("express").Router();

const {
  getAssignment,
  createAssignment,
  updateAssignment,
  submitAssignment,
  deleteAssignment,
} = require("../controllers/assignmentsController");

router
  .route("/:courseId/:assignmentId")
  .get(getAssignment)
  .patch(updateAssignment)
  .delete(deleteAssignment);
router.route("/:courseId").post(createAssignment);
router.route("/:courseId/:assignmentId/submit").post(submitAssignment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Assignments
 *   description: Assignment management API
 */

/**
 * @swagger
 * /assignments/{courseId}/{assignmentId}:
 *   get:
 *     summary: Get an assignment by ID
 *     tags: [Assignments]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the assignment belongs
 *         schema:
 *           type: string
 *       - name: assignmentId
 *         in: path
 *         required: true
 *         description: The ID of the assignment to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *                 submittedFiles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fileUrl:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       submitDate:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: Assignment not found
 */

/**
 * @swagger
 * /assignments/{courseId}:
 *   post:
 *     summary: Create a new assignment
 *     tags: [Assignments]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the assignment will be added
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
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Assignment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 dueDate:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Course not found
 *       403:
 *         description: Only the course instructor can add assignments
 */

/**
 * @swagger
 * /assignments/{courseId}/{assignmentId}:
 *   patch:
 *     summary: Update an assignment by ID
 *     tags: [Assignments]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the assignment belongs
 *         schema:
 *           type: string
 *       - name: assignmentId
 *         in: path
 *         required: true
 *         description: The ID of the assignment to update
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
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Assignment not found
 *       403:
 *         description: Only the course instructor can update this assignment
 */

/**
 * @swagger
 * /assignments/{courseId}/{assignmentId}:
 *   delete:
 *     summary: Delete an assignment by ID
 *     tags: [Assignments]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the assignment belongs
 *         schema:
 *           type: string
 *       - name: assignmentId
 *         in: path
 *         required: true
 *         description: The ID of the assignment to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Assignment deleted successfully
 *       404:
 *         description: Assignment not found
 *       403:
 *         description: Only the course instructor can delete this assignment
 */

/**
 * @swagger
 * /assignments/{courseId}/{assignmentId}/submit:
 *   post:
 *     summary: Submit an assignment
 *     tags: [Assignments]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the assignment belongs
 *         schema:
 *           type: string
 *       - name: assignmentId
 *         in: path
 *         required: true
 *         description: The ID of the assignment being submitted
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               documents:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Assignment submitted successfully
 *       404:
 *         description: Assignment not found
 *       403:
 *         description: You are not enrolled in this course
 *       500:
 *         description: Couldn't upload your document
 */

