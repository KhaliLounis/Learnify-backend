const router = require("express").Router();

const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require("../controllers/usersController");

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/").get(getAllUsers);

module.exports = router;
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *           example: "John Doe"
 *         imageUrl:
 *           type: string
 *           description: The URL of the user's profile image (optional).
 *           example: "https://example.com/profile.jpg"
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           description: The password of the user (hashed before saving).
 *           example: "SecurePassword123"
 *         joinedCourses:
 *           type: array
 *           description: A list of course IDs the user has joined.
 *           items:
 *             type: string
 *             example: "60b8c7d1f1a7d7c3d8f5d5d3"
 *         role:
 *           type: string
 *           description: The role of the user.
 *           enum: ["Student", "Instructor", "Admin"]
 *           example: "Student"
 *         level:
 *           type: string
 *           description: The education level of the user (only for Students).
 *           example: "Beginner"
 *       example:
 *         name: "John Doe"
 *         imageUrl: "https://example.com/profile.jpg"
 *         email: "john.doe@example.com"
 *         password: "SecurePassword123"
 *         joinedCourses: ["60b8c7d1f1a7d7c3d8f5d5d3"]
 *         role: "Student"
 *         level: "Beginner"
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 level:
 *                   type: string
 *                 joinedCourses:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   level:
 *                     type: string
 *                   joinedCourses:
 *                     type: array
 *                     items:
 *                       type: string
 *       404:
 *         description: No users found
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               level:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     level:
 *                       type: string
 *                     joinedCourses:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: User not found
 */
