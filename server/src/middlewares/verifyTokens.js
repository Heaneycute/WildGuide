const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

const verifyRefreshToken = (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    res.locals.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'refresh token error' });
  }
};

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];

    const token = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    res.locals.user = token.user;

    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'accsess token error' });
  }
};

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
};
