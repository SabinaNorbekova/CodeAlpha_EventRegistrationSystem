import * as registrationService from '../services/registration.service.js';

export const register = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({
        error: 'User ID and Event ID are required',
      });
    }

    const newRegistration = await registrationService.registerForEvent(userId, eventId);
    res.status(201).json(newRegistration);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }

    if (error.message === 'Event is full') {
      return res.status(400).json({ error: 'Sorry, this event is fully booked' });
    }

    if (error.message === 'User already registered for this event') {
      return res.status(409).json({ error: 'You are already registered' });
    }

    if (error.message === 'Event not found') {
      return res.status(404).json({ error: 'Event not found' });
    }

    console.error(error);
    res.status(500).json({ error: 'Could not register for event' });
  }
};

export const cancel = async (req, res) => {
  try {
    const { id } = req.params;
    await registrationService.cancelRegistration(id);
    res.json({
      message: 'Registration cancelled successfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Could not cancel registration',
    });
  }
};

export const getList = async (req, res) => {
  try {
    const list = await registrationService.getAllRegistrations();
    res.json(list);
  } catch (error) {
    res.status(500).json({
      error: 'Could not fetch registrations',
    });
  }
};
