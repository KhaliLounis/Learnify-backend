const router = require("express").Router();
const authRouter = require("./auth");
const userRouter = require("./users");
const discussionRouter = require("./discussions");
const coursesRouter = require("./courses");
const modulesRouter = require("./modules");
const quizzesRouter = require("./quizzes");
const assignmentsRouter = require("./assignments");

const verifyAuth = require("../middleware/auth");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/courses", verifyAuth, coursesRouter);
router.use("/modules", verifyAuth, modulesRouter);
router.use("/discussions", verifyAuth, discussionRouter);
router.use("/quizzes", verifyAuth, quizzesRouter);
router.use("/assignments", verifyAuth, assignmentsRouter);

module.exports = router;
