const Module = require("../models/Module");
const Course = require("../models/Course");
const getModule = async (req, res) => {
  const { moduleId } = req.params;
  const module = await Module.findById(moduleId).populate([
    { path: "quizIds" },
    { path: "courseId" },
  ]);
  if (!module) {
    return res.status(404).json({ message: "Module not found" });
  }
  res.status(200).json(module);
};

const createModule = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const { role } = req.user;
  if (!title) {
    return res
      .status(400)
      .json({ message: "Please provide the module's title" });
  }
  const course = await Course.findById(id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (
    role !== "Instructor" ||
    course.instructorId.toString() !== req.user.userId
  ) {
    return res
      .status(403)
      .json({ message: "Only the course's instructor can create modules" });
  }
  const module = await Module.create({ title, courseId: id });
  course.moduleIds.push(module._id);
  await course.save();
  res.status(201).json(module);
};
const updateModule = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteModule = async (req, res) => {
  const { courseId, moduleId } = req.params;
  const { userId } = req.user;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (
    course.instructorId.toString() !== userId ||
    course.moduleIds.indexOf(moduleId) === -1
  ) {
    return res
      .status(403)
      .json({ message: "Only the course's instructor can delete modules" });
  }
  await Module.findByIdAndDelete(moduleId);
  course.moduleIds = course.moduleIds.filter(
    (id) => id.toString() !== moduleId
  );
  await course.save();
  res.status(200).json({ message: "Module deleted successfully" });
};

module.exports = {
  getModule,
  createModule,
  updateModule,
  deleteModule,
};
