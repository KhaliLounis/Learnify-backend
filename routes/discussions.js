const router = require("express").Router();

const {
  getDiscussion,
  createDiscussion,
  updateDiscussion,
  upvoteDiscussion,
  replyToDiscussion,
  deleteDiscussion,
} = require("../controllers/discussionsController");

router
  .route("/")
  .get(getDiscussion)
  .post(createDiscussion)
  .patch(updateDiscussion)
  .delete(deleteDiscussion);
router.route("/:id/upvote").patch(upvoteDiscussion);
router.route("/:id/reply").post(replyToDiscussion);

module.exports = router;
