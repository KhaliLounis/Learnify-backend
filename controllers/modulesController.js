const Module = require("../models/Module");
const Course = require("../models/Course");
const uploadDocument = require("../utils/upload");
const uploadImage = require("../utils/upload");

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
  const { courseId } = req.params;
  const { role, userId } = req.user;
  if (!title) {
    return res
      .status(400)
      .json({ message: "Please provide the module's title" });
  }
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (course.instructorId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Only the course's instructor can create modules" });
  }

  const module = await Module.create({ title, courseId: courseId });

  course.moduleIds.push(module._id);
  await course.save();

  res.status(201).json(module);
};

const updateModule = async (req, res) => {
  const { title } = req.body;
  const { courseId, moduleId } = req.params;
  const { userId } = req.user;
  if (!title) {
    return res.status(400).json({ message: "Please provide the new title" });
  }
  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404).json({ message: "No course found with this id" });
  }
  if (course.instructorId.toString() !== userId) {
    res
      .status(403)
      .json({ message: "Only the course instructor can update it" });
  }
  const module = await Module.findByIdAndUpdate(
    moduleId,
    { title },
    { new: true, runValidators: true },
  );

  res.status(200).json({ message: "Module updated successfully" });
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
    (id) => id.toString() !== moduleId,
  );
  await course.save();
  res.status(200).json({ message: "Module deleted successfully" });
};
const addResourcesToModule = async (req, res) => {
  const { courseId, moduleId } = req.params;
  const { userId } = req.user;
  const { resources } = req.body;
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
      .json({ message: "Only the course's instructor can add resource" });
  }
  if (!Array.isArray(resources) || resources.length === 0) {
    return res
      .status(400)
      .json({ message: "Resources must be a non-empty array" });
  }
  const module = await Module.findById(moduleId);
  module.resources.push(...resources);
  await module.save();
  res.status(200).json({ message: "resources added to module succesfully" });
};

const addContentToModule = async (req, res) => {
  const { courseId, moduleId } = req.params;
  const { userId } = req.user;
  const { contentTitle, description } = req.body;
  if (!contentTitle) {
    return res
      .status(400)
      .json({ message: "please provide the new content title" });
  }
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
      .json({ message: "Only the course's instructor can add content" });
  }
  const module = await Module.findById(moduleId);
  if (!module) {
    return res.status(404).json({ message: "Module not found" });
  }
  let contentFiles = [];

  if (req.files && req.files.documents) {
    const files = Array.isArray(req.files.documents)
      ? req.files.documents
      : [req.files.documents];
    console.log(files);
    for (const file of files) {
      try {
        const fileUrl = await uploadDocument(file);
        console.log(fileUrl);
        contentFiles.push(fileUrl);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "File upload failed", error: error.message });
      }
    }
  }

  const newContent = {
    title: contentTitle,
    files: contentFiles,
    description: description,
  };

  module.content.push(newContent);
  await module.save();

  res
    .status(200)
    .json({ message: "Content added to module successfully", module });
};

module.exports = {
  getModule,
  createModule,
  updateModule,
  deleteModule,
  addResourcesToModule,
  addContentToModule,
};
