const router = require('express').Router();
const { HuntingArea } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');


// Получение списка всех зон
router.get('/', async (req, res) => {
  try {
    const areas = await HuntingArea.findAll();
    res.json(areas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Получение публичных зон
router.get('/public', async (req, res) => {
  try {
    const areas = await HuntingArea.findAll({
      where: { userId: null }
    });
    res.json(areas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Получение личных зон (требует авторизации)
router.get('/private', authMiddleware, async (req, res) => {
  try {
    const areas = await HuntingArea.findAll({
      where: { userId: req.user.id }
    });
    res.json(areas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Получение конкретной зоны
router.get('/:id', async (req, res) => {
  try {
    const area = await HuntingArea.findByPk(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    
    // Проверка доступа к личной зоне
    if (area.userId && (!req.user || (req.user.id !== area.userId && !req.user.isAdmin))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(area);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Создание новой зоны (требует авторизации)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const area = await HuntingArea.create({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(area);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Массовое создание зон (только админ)
router.post('/bulk', adminMiddleware, async (req, res) => {
  try {
    const areas = await HuntingArea.bulkCreate(req.body);
    res.status(201).json(areas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Обновление зоны (владелец или админ)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const area = await HuntingArea.findByPk(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    
    if (area.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await area.update(req.body);
    res.json(area);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Частичное обновление зоны (владелец или админ)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const area = await HuntingArea.findByPk(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    
    if (area.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await area.update(req.body);
    res.json(area);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Удаление зоны (владелец или админ)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const area = await HuntingArea.findByPk(req.params.id);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    
    if (area.userId !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    await area.destroy();
    res.json({ message: 'Area deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Массовое удаление зон (только админ)
router.delete('/bulk', adminMiddleware, async (req, res) => {
  try {
    await HuntingArea.destroy({
      where: {
        id: req.body.ids
      }
    });
    res.json({ message: 'Areas deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;