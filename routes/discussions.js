const router = require("express").Router();

const {
  getDiscussion,
  createDiscussion,
  updateDiscussion,
  upvoteDiscussion,
  replyToDiscussion,
  deleteDiscussion,
} = require("../controllers/discussionsController");

router.route("/:courseId").post(createDiscussion);

router
  .route("/:courseId/:discussionId")
  .get(getDiscussion)
  .patch(updateDiscussion)
  .delete(deleteDiscussion);
router.route("/:courseId/:discussionId/upvote").post(upvoteDiscussion);
router.route("/:courseId/:discussionId/reply").post(replyToDiscussion);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Discussions
 *   description: API for managing course discussions
 */

/**
 * @swagger
 * /discussions/{courseId}:
 *   post:
 *     summary: Create a new discussion for a course
 *     tags: [Discussions]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         description: The ID of the course to create a discussion in
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the discussion
 *     responses:
 *       201:
 *         description: Discussion created successfully
 *       400:
 *         description: Missing discussion content
 */

/**
 * @swagger
 * /discussions/{courseId}/{discussionId}:
 *   get:
 *     summary: Get a discussion by ID
 *     tags: [Discussions]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course
 *       - name: discussionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the discussion to retrieve
 *     responses:
 *       200:
 *         description: Discussion retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 content:
 *                   type: string
 *                 userId:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                 upvotes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                 replies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                       replyText:
 *                         type: string
 *       404:
 *         description: No discussion found with this ID
 */

/**
 * @swagger
 * /discussions/{courseId}/{discussionId}:
 *   patch:
 *     summary: Update a discussion by ID
 *     tags: [Discussions]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: discussionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Discussion updated successfully
 *       403:
 *         description: Only the creator can update the discussion
 *       404:
 *         description: No discussion found with this ID
 *       400:
 *         description: Missing discussion content
 */

/**
 * @swagger
 * /discussions/{courseId}/{discussionId}:
 *   delete:
 *     summary: Delete a discussion by ID
 *     tags: [Discussions]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: discussionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discussion deleted successfully
 *       403:
 *         description: Only the creator can delete the discussion
 *       404:
 *         description: No discussion found with this ID
 */

/**
 * @swagger
 * /discussions/{courseId}/{discussionId/upvote:
 *   post:
 *     summary: Upvote a discussion
 *     tags: [Discussions]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: discussionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Upvote added/removed successfully
 *       404:
 *         description: Discussion not found
 */

/**
 * @swagger
 * /discussions/{courseId}/{discussionId}/reply:
 *   post:
 *     summary: Reply to a discussion
 *     tags: [Discussions]
 *     parameters:
 *       - name: courseId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: discussionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               replyText:
 *                 type: string
 *                 description: The content of the reply
 *     responses:
 *       200:
 *         description: Reply added successfully
 *       404:
 *         description: Discussion not found
 */
