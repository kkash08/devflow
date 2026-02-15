import express from "express";
import Task from "../models/Task.js";
import authToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", authToken, async (req, res) => {
  try {
    const filter = { user: req.user.id };

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const tasks = await Task.find(filter).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks" });
  }
});

router.post("/", authToken, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task" });
  }
});

router.put("/:id", authToken, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    console.log(task);
    if (!task) {
      console.log("task no");
      return res.status(404).json({ msg: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error updating task" });
  }
});

router.delete("/:id", authToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting task" });
  }
});

export default router;
