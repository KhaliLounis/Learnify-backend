const router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const discussionRouter = require("./discussion");
const courseRouter = require("./course");
const moduleRouter = require("./module");
const progressRouter = require("./progress");
const quizRouter = require("./quiz");
const assignmentRouter = require("./assignment");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/discussions", discussionRouter);
router.use("/courses", courseRouter);
router.use("/modules", moduleRouter);
router.use("/quizzes", quizRouter);
router.use("/assignments", assignmentRouter);
// router.use("/progress", progressRouter);

module.exports = router;

