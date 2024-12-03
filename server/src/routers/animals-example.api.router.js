const router = require('express').Router();
const { AnimalExample } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const animals = await AnimalExample.findAll();
    res.json(animals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;