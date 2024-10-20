const router = require("express").Router();

const {
  getDiscussion,
  createDiscussion,
  updateDiscussion,
  upvoteDiscussion,
  replyToDiscussion,
  deleteDiscussion,
} = require("../controllers/discussionsController");

router.route("/").post(createDiscussion);

router
  .route("/discussionId")
  .get(getDiscussion)
  .patch(updateDiscussion)
  .delete(deleteDiscussion);
router.route("/:discussionId/upvote").post(upvoteDiscussion);
router.route("/:discussionId/reply").post(replyToDiscussion);

module.exports = router;
