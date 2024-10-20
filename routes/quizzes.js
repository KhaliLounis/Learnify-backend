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
