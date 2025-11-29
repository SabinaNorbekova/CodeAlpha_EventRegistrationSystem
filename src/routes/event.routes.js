import express from 'express';
import {
  getEventById,
  getAllEvents,
  createEvent,
  deleteEvent,
} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.delete('/:id', deleteEvent);

export { router as eventRouter };
