const router = require("express").Router();

const {
  getModule,
  createModule,
  updateModule,
  deleteModule,
  getCourseModules,
} = require("../controllers/modulesController");

router.route("/:id").get(getModule).patch(updateModule).delete(deleteModule);
router.route("/").post(createModule);
// router.route("/course/:id").get(getCourseModules);

module.exports = router;
