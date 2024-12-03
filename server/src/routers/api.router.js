const router = require('express').Router();
const authRouter = require('./auth.api.router');
const resetPasswordRouter = require('./resetPassword.api.router');
const tokenRouter = require('./token.api.router');
const animalsExampleRouter = require('./animals-example.api.router');

router.use('/auth', authRouter);
router.use('/auth/reset-password', resetPasswordRouter);
router.use('/token', tokenRouter);
router.use('/animals-example', animalsExampleRouter);

module.exports = router;