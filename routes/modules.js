const router = require("express").Router();

const {
  getModule,
  createModule,
  updateModule,
  deleteModule,
} = require("../controllers/modulesController");


router.route("/").post(createModule);
router
  .route("/:moduleId")
  .get(getModule)
  .patch(updateModule)
  .delete(deleteModule);

module.exports = router;
