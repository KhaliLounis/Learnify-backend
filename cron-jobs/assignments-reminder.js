const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Assignment = require("../models/Assignment");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD, 
  },
});

// Helper function to send an email
const sendReminderEmail = async (email, courseTitle, assignmentTitle) => {
  const mailOptions = {
    from: "khalil43k@gmail.com",
    to: email,
    subject: `Reminder: Assignment "${assignmentTitle}" due in 1 day`,
    text: `Hello,\n\nThis is a reminder that the assignment "${assignmentTitle}" for the course "${courseTitle}" is due in 1 day. Please make sure to submit it on time.\n\nBest regards, Learnify.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}: ${error.message}`);
  }
};

// Cron job that runs every day at midnight
cron.schedule("0 0 * * *", async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const assignmentsDueTomorrow = await Assignment.find({
      dueDate: {
        $gte: new Date(tomorrow.setHours(0, 0, 0, 0)),
        $lt: new Date(tomorrow.setHours(23, 59, 59, 999)),
      },
    }).populate("courseId");

    for (const assignment of assignmentsDueTomorrow) {
      const course = assignment.courseId;
      if (course) {
        const enrolledStudents = await User.find({
          joinedCourses: course._id,
        });

        for (const student of enrolledStudents) {
          await sendReminderEmail(
            student.email,
            course.title,
            assignment.title
          );
        }
      }
    }
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});
