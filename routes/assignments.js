const router = require("express").Router();

const {
  getAssignment,
  createAssignment,
  updateAssignment,
  submitAssignment,
  deleteAssignment,
} = require("../controllers/assignmentsController");

router
  .route("/:courseId/:assignmentId")
  .get(getAssignment)
  .patch(updateAssignment)
  .delete(deleteAssignment);
router.route("/:courseId").post(createAssignment);
router.route("/:courseId/:assignmentId/submit").post(submitAssignment);

module.exports = router;
