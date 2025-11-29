import express from 'express';
import {
  registerUser,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', registerUser);
router.get('/', getAllUsers);
router.get('/:id', getUserDetails);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export { router as userRouter };
