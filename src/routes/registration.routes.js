import express from 'express';
import { register, cancel, getList } from '../controllers/registration.controller.js';

const router = express.Router();

router.post('/', register);
router.delete('/:id', cancel);
router.get('/', getList);

export { router as registrationRouter };
