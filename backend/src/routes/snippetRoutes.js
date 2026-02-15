import express from "express";
import Snippet from "../models/Snippet.js";
import authToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", authToken, async (req, res) => {
  try {
    const filter = { user: req.user.id };
    const snippets = await Snippet.find(filter).sort({
      createdAt: -1,
    });
    res.json(snippets);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching snippets" });
  }
});

router.post("/", authToken, async (req, res) => {
  try {
    const snippet = await Snippet.create({ ...req.body, user: req.user.id });
    res.status(201).json(snippet);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching snippets" });
  }
});

router.get("/:id", authToken, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching snippet" });
  }
});

router.put("/:id", authToken, async (req, res) => {
  try {
    const snippet = await Snippet.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      { new: true }
    );
    if (!snippet) {
      return res.status(404).json({ msg: "Snippet not found" });
    }
    res.status(200).json(snippet);
  } catch (error) {
    res.status(500).json({ msg: "Error updating snippet" });
  }
});

router.delete("/:id", authToken, async (req, res) => {
  try {
    const snippet = await Snippet.findByIdAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!snippet) return res.status(404).json({ msg: "Snippet not found" });
    res.json({ msg: "Snippet deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting snippet" });
  }
});

export default router;
