const router = require('express').Router();
const { where } = require('sequelize');
const { Task } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

router
  .get('/', verifyAccessToken, async (req, res) => {
    try {
      console.log(res.locals.user.id);
      const entries = await Task.findAll({
        where: { userId: res.locals.user.id },
      });
      res.json(entries);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .post('/', verifyAccessToken, async (req, res) => {
    const { name, description } = req.body;
    try {
      const entry = await Task.create({
        name,
        description,
        userId: res.locals.user.id,
      });
      res.json(entry);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })
  .delete('/:id', verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    try {
      const task = await Task.findOne({ where: { id } });

      if (task.userId === res.locals.user.id) {
        task.destroy();
        res.sendStatus(200);
      } else {
        res.status(400).json({ message: 'У вас нет прав на удаление записи' });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;
