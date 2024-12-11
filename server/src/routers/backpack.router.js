const express = require("express");
const router = express.Router();
const { Backpack } = require("../../db/models");

router.post("/", async (req, res) => {
  const { item } = req.body;
  if (!item) {
    return res.status(400).json({ error: "Название вещи обязательно" });
  }
  try {
    const newItem = await Backpack.create({ item });
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Ошибка при добавлении вещи:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Backpack.findAll();
    res.status(200).json(items);
  } catch (error) {
    console.error("Ошибка при получении вещей:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;
