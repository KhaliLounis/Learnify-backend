const router = require("express").Router();

const {
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getUserCourses,
  enrollInCourse,
  unenrollInCourse,
} = require("../controllers/coursesController");

router.route("/").post(createCourse).get(getUserCourses);

router
  .route("/:courseId")
  .get(getCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

router.route("/:courseId/enroll").patch(enrollInCourse);

router.route("/:courseId/unenroll").patch(unenrollInCourse);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management API
 */

/**
 * @swagger
 * /courses/{courseId}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course retrieved successfully
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
 *                 level:
 *                   type: string
 *                 instructorId:
 *                   type: string
 *                 modules:
 *                   type: array
 *                   items:
 *                     type: string
 *                 assignments:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Course not found
 */

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
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
 *               level:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created successfully
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
 *                 level:
 *                   type: string
 *                 instructorId:
 *                   type: string
 *       400:
 *         description: Invalid request data
 *       403:
 *         description: Only instructors can create courses
 */

/**
 * @swagger
 * /courses/{courseId}:
 *   patch:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to update
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
 *               level:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Invalid request data
 *       403:
 *         description: Only instructors can update courses
 *       404:
 *         description: Course not found
 */

/**
 * @swagger
 * /courses/{courseId}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       403:
 *         description: Only the instructor can delete the course
 *       404:
 *         description: Course not found
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses of a user
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of user's courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   level:
 *                     type: string
 *       404:
 *         description: No courses found
 */

/**
 * @swagger
 * /courses/{courseId}/enroll:
 *   patch:
 *     summary: Enroll in a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to enroll in
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrolled in the course successfully
 *       403:
 *         description: User cannot enroll in this course
 *       404:
 *         description: Course not found
 */

/**
 * @swagger
 * /courses/{courseId}/unenroll:
 *   patch:
 *     summary: Unenroll from a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to unenroll from
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Unenrolled from the course successfully
 *       404:
 *         description: Course not found
 */
