const router = require("express").Router();

const {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
  getCourseQuizzes,
} = require("../controllers/quizzesController");

router.route("/:id").get(getQuiz).patch(updateQuiz).delete(deleteQuiz);
router.route("/:id/submit").post(submitQuiz);
router.route("/").post(createQuiz);
// router.route("/course/:id").get(getCourseQuizzes);

module.exports = router;
