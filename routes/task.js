import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const tasks = await Task.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true }
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
