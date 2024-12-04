const express = require("express");
const router = express.Router();
const { Event } = require("../../db/models");
const { verifyAccessToken } = require("../middlewares/verifyTokens");

const handleError = (res) => (error) => {
  console.error("Error:", error);
  const errorMessage = error.message || "Server Error";
  res.status(500).json({ error: errorMessage });
};

const validateEvent = (req, res, next) => {
  const { date, title } = req.body;
  if (!date || !title) {
    return res.status(400).json({ error: "Date and title are required" });
  }
  next();
};

router.post("/", verifyAccessToken, validateEvent, async (req, res) => {
  try {
    const newEvent = await Event.create({ ...req.body, userId: req.user.id });
    res.status(201).json(newEvent);
  } catch (error) {
    handleError(res)(error);
  }
});

router.get("/", verifyAccessToken, async (req, res) => {
  try {
    const events = await Event.findAll({ where: { userId: req.user.id } });
    res.json(events);
  } catch (error) {
    handleError(res)(error);
  }
});

router.get("/:id", verifyAccessToken, async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) {
    handleError(res)(error);
  }
});

router.put("/:id", verifyAccessToken, validateEvent, async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    await event.update(req.body);
    res.json(event);
  } catch (error) {
    handleError(res)(error);
  }
});

router.delete("/:id", verifyAccessToken, async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const event = await Event.findOne({
      where: { id: parseInt(req.params.id), userId: req.user.id },
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    await event.destroy();
    res.status(204).send();
  } catch (error) {
    handleError(res)(error);
  }
});

module.exports = router;
