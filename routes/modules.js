const router = require("express").Router();

const {
  getModule,
  createModule,
  updateModule,
  deleteModule,
  addContentToModule,
  addResourcesToModule,
} = require("../controllers/modulesController");

router.route("/:courseId").post(createModule);
router
  .route("/:courseId/:moduleId")
  .get(getModule)
  .patch(updateModule)
  .delete(deleteModule);
router.route("/:courseId/:moduleId/add-resources").post(addResourcesToModule);
router.route("/:courseId/:moduleId/add-content").post(addContentToModule);

module.exports = router;
