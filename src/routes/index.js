import express from 'express';
import { userRouter } from './user.routes.js';
import { eventRouter } from './event.routes.js';
import { registrationRouter } from './registration.routes.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/events', eventRouter);
router.use('/registration', registrationRouter);

export default router;
