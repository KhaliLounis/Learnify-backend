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

router.route("/:id").get(getCourse).patch(updateCourse).delete(deleteCourse);

router.route("/:id/enroll").post(enrollInCourse);

router.route("/:id/unenroll").delete(unenrollInCourse);

module.exports = router;
