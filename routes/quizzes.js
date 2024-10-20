const router = require("express").Router();

const {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} = require("../controllers/quizzesController");

router.route("/:quizId").get(getQuiz).patch(updateQuiz).delete(deleteQuiz);
router.route("/:quizId/submit").post(submitQuiz);
router.route("/").post(createQuiz);

module.exports = router;
