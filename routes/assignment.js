const router = require("express").Router();

const {
  getAssignment,
  createAssignment,
  updateAssignment,
  submitAssignment,
  deleteAssignment,
  getCourseAssignments,
} = require("../controllers/assignmentsController");

router
  .route("/:id")
  .get(getAssignment)
  .patch(updateAssignment)
  .delete(deleteAssignment);
router.route("/").post(createAssignment);
router.route("/:id/submit").post(submitAssignment);

module.exports = router;
