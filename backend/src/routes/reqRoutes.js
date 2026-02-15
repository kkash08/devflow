import express from "express";
import authToken from "../middleware/auth.js";
import Request from "../models/APIRequest";
import axios from "axios";

const router = express.Router();

router.get("/", authToken, async (req, res) => {
  try {
    const filter = { user: req.user.id };

    if (req.query.method) {
      filter.method = req.query.method;
    }

    const reqs = Request.find(filter).sort({
      createdAt: -1,
    });

    res.json(reqs);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching saved requests" });
  }
});

router.post("/", authToken, async (req, res) => {
  try {
    const newReq = await Request.create({ ...req.body, user: req.user.id });
    res.status(201).json(newReq);
  } catch (error) {
    res.status(500).json({ msg: "Error creating new request" });
  }
});

router.delete("/:id", authToken, async (req, res) => {
  try {
    const delReq = await Request.findByIdAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    res.json(delReq);
  } catch (error) {
    res.status(500).json({ msg: "Error deleting request" });
  }
});

router.post("/test/:id", authToken, async (req, res) => {
  try {
    const filter = {
      user: req.user.id,
      _id: req.params.id,
    };
    const fetchReq = await Request.find(filter);
    if (!fetchReq) {
      res.status(404).json({ msg: "Error finding saved requests" });
    }

    const options = {
      method: fetchReq.method,
      url: fetchReq.url,
      headers: { ...fetchReq.headers, ...(req.body.headers || {}) },
      data: req.body.body || fetchReq.body,
    };

    const response = await axios(options);

    res.json({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
    });
    
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
