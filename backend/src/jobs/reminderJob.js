import cron from "node-cron";
import Reminder from "../models/Reminders.js";
import Task from "../models/Task.js";
import { transporter } from "../utils/email.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const reminders = await Reminder.find({ time: { $lte: now } });
  if (reminders) {
    for (let reminder of reminders) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: reminder.email,
        subject: "Hi from DevFlow",
        text: reminder.message,
      });

      await Reminder.deleteOne({ _id: reminder._id });
    }
  }
});

// add a cron job that runs every day in the morning at 9 am or 10 am and sends email to all users about that task items that needs to be closed today.

cron.schedule("", async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tasks = await Task.find({
    status: { $ne: "completed" },
    dueDate: { $gte: today, $lt: tomorrow },
  }).populate("user", "_id, firstName, userEmail");

  const tasksByUser = {}
  for(let task of tasks){
    let curTaskOwner = task.user.userEmail;
    if(!tasksByUser[curTaskOwner]){
        tasksByUser[curTaskOwner] = {
            name: task.user.firstName,
            utasks: []
        }
    }
    tasksByUser[curTaskOwner].utasks.push(task.taskTitle);
  }

  // tasksByUser = {
  //  'abc@gmail.com' : {
  //      name:abc,
  //      utask: [t1,t2]
  //  }
  //}

  for(const userDet in tasksByUser){
    let emailDet = userDet;
    let taskDet = tasksByUser[emailDet];

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emailDet,
        subject: "⏰ Tasks Due Today",
        text: ``
    });

  }
});
