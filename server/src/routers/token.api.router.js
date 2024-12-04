const router = require('express').Router();
const { verifyRefreshToken } = require('../middlewares/verifyTokens');
const generateToken = require('../utils/generateToken');
const cookieConfig = require('../configs/cookieConfig');

router.get('/refresh', verifyRefreshToken, (req, res) => {
  const { accessToken, refreshToken } = generateToken({
    user: req.user,
  });

  res
    .cookie('refreshToken', refreshToken, cookieConfig.refresh)
    .json({ user: req.user, accessToken });
});

module.exports = router;
