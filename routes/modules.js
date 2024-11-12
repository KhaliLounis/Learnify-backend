const router = require("express").Router();

const {
  getModule,
  createModule,
  updateModule,
  deleteModule,
  addContentToModule,
  addResourcesToModule,
} = require("../controllers/modulesController");

router.route("/:courseId").post(createModule);
router
  .route("/:courseId/:moduleId")
  .get(getModule)
  .patch(updateModule)
  .delete(deleteModule);
router.route("/:courseId/:moduleId/add-resources").post(addResourcesToModule);
router.route("/:courseId/:moduleId/add-content").post(addContentToModule);

module.exports = router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Module:
 *       type: object
 *       required:
 *         - title
 *         - courseId
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the module.
 *           example: "Introduction to Node.js"
 *         content:
 *           type: array
 *           description: A list of content objects within the module.
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the content section.
 *                 example: "Getting Started with Node.js"
 *               files:
 *                 type: array
 *                 description: A list of file paths or URLs related to the content.
 *                 items:
 *                   type: string
 *                   example: "/files/nodejs-intro.pdf"
 *               description:
 *                 type: string
 *                 description: A description of the content.
 *                 example: "This section introduces Node.js and its features."
 *         courseId:
 *           type: string
 *           format: objectId
 *           description: The ID of the course to which this module belongs.
 *           example: "603d2f5f91b8b156506f9c27"
 *         resources:
 *           type: array
 *           description: A list of URLs or paths to resources associated with the module.
 *           items:
 *             type: string
 *             example: "https://example.com/resources/nodejs-tutorial"
 *       example:
 *         title: "Introduction to Node.js"
 *         content:
 *           - title: "Getting Started with Node.js"
 *             files:
 *               - "/files/nodejs-intro.pdf"
 *             description: "This section introduces Node.js and its features."
 *         courseId: "603d2f5f91b8b156506f9c27"
 *         resources:
 *           - "https://example.com/resources/nodejs-tutorial"
 */

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: Module management API
 */

/**
 * @swagger
 * /courses/{courseId}/modules/{moduleId}:
 *   get:
 *     summary: Get a module by ID
 *     tags: [Modules]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the module belongs
 *         schema:
 *           type: string
 *       - name: moduleId
 *         in: path
 *         required: true
 *         description: The ID of the module to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 resources:
 *                   type: array
 *                   items:
 *                     type: string
 *                 content:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       files:
 *                         type: array
 *                         items:
 *                           type: string
 *       404:
 *         description: Module not found
 */

/**
 * @swagger
 * /courses/{courseId}/modules:
 *   post:
 *     summary: Create a new module for a course
 *     tags: [Modules]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course for the new module
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
 *     responses:
 *       201:
 *         description: Module created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Course not found
 *       403:
 *         description: Only the course's instructor can create modules
 */

/**
 * @swagger
 * /courses/{courseId}/modules/{moduleId}:
 *   patch:
 *     summary: Update a module by ID
 *     tags: [Modules]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the module belongs
 *         schema:
 *           type: string
 *       - name: moduleId
 *         in: path
 *         required: true
 *         description: The ID of the module to update
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
 *     responses:
 *       200:
 *         description: Module updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Module or course not found
 *       403:
 *         description: Only the course instructor can update the module
 */

/**
 * @swagger
 * /courses/{courseId}/modules/{moduleId}:
 *   delete:
 *     summary: Delete a module by ID
 *     tags: [Modules]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course from which to delete the module
 *         schema:
 *           type: string
 *       - name: moduleId
 *         in: path
 *         required: true
 *         description: The ID of the module to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module deleted successfully
 *       404:
 *         description: Module or course not found
 *       403:
 *         description: Only the course's instructor can delete modules
 */

/**
 * @swagger
 * /courses/{courseId}/modules/{moduleId}/add-resources:
 *   post:
 *     summary: Add resources to a module
 *     tags: [Modules]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the module belongs
 *         schema:
 *           type: string
 *       - name: moduleId
 *         in: path
 *         required: true
 *         description: The ID of the module to which to add resources
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resources:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Resources added to module successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Module or course not found
 *       403:
 *         description: Only the course's instructor can add resources
 */

/**
 * @swagger
 * /courses/{courseId}/modules/{moduleId}/add-content:
 *   post:
 *     summary: Add content to a module
 *     tags: [Modules]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to which the module belongs
 *         schema:
 *           type: string
 *       - name: moduleId
 *         in: path
 *         required: true
 *         description: The ID of the module to which to add content
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contentTitle:
 *                 type: string
 *               description:
 *                 type: string
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Content added to module successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Module or course not found
 *       403:
 *         description: Only the course's instructor can add content
 */
