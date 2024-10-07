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

router
  .route("/:courseId")
  .get(getCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

router.route("/:courseId/enroll").patch(enrollInCourse);

router.route("/:courseId/unenroll").patch(unenrollInCourse);

module.exports = router;
