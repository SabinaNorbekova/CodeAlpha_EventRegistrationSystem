import * as eventService from '../services/event.service.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity } = req.body;

    if (!title || !date || !capacity) {
      return res.status(400).json({
        error: 'Title, date and capacity are required',
      });
    }

    const event = await eventService.createEvent(title, description, date, location, capacity);
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Could not create event',
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({
      error: 'Could not fetch events',
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventService.getEventById(id);

    if (!event) {
      return res.status(404).json({
        error: 'Event not found',
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      error: 'Could not fetch event',
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await eventService.deleteEvent(id);
    res.json({
      message: 'Event deleted succesfully',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Could not delete event',
    });
  }
};
