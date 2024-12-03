const router = require('express').Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User, PasswordResetToken } = require('../../db/models');

router.post('/', async (req, res) => {
  const { email } = req.body;
  
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await PasswordResetToken.create({
      userId: user.id,
      token,
      expiresAt
    });

    res.json({ 
      message: 'Инструкции по восстановлению пароля отправлены',
      token
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Добавить новый роут для установки пароля
router.post('/new-password', async (req, res) => {
    const { token, password } = req.body;
    
    try {
      // Находим токен в базе и проверяем срок действия
      const resetToken = await PasswordResetToken.findOne({ 
        where: { 
          token,
          expiresAt: { [Op.gt]: new Date() }
        },
        include: [User]
      });
  
      if (!resetToken) {
        return res.status(400).json({ 
          message: 'Недействительный или просроченный токен' 
        });
      }
  
      // Обновляем пароль пользователя
      const hashedPassword = await bcrypt.hash(password, 10);
      await resetToken.user.update({ password: hashedPassword });
      
      // Удаляем использованный токен
      await resetToken.destroy();
  
      res.json({ message: 'Пароль успешно обновлен' });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

module.exports = router;