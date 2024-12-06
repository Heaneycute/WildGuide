const router = require('express').Router();
const newPasswordRouter = require('./newPassword.api.router');
const resetPasswordRouter = require('./resetPassword.api.router');
const authRouter = require('./auth.api.router');
const tokenRouter = require('./token.api.router');
const animalsExampleRouter = require('./animals-example.api.router');
const eventsRouter = require("./events.api.router");
const weaponsRouter = require("./weapons.router");
const huntingAreasRouter = require("./hunting-areas.api.router");


router.use('/auth/new-password', newPasswordRouter);
router.use('/auth/reset-password', resetPasswordRouter);
router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/animals-example', animalsExampleRouter);
router.use("/events", eventsRouter);
router.use("/weapons", weaponsRouter);
router.use("/hunting-areas", huntingAreasRouter);


module.exports = router;
