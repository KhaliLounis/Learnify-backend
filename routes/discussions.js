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
