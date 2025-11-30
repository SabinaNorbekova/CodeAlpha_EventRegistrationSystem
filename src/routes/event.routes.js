import express from 'express';
import {
  getEventById,
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller.js';

const router = express.Router();

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.delete('/:id', deleteEvent);
router.put('/:id', updateEvent);

export { router as eventRouter };
