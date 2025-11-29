import { parse } from 'dotenv';
import prisma from '../config/db.js';

export const registerForEvent = async (userId, eventId) => {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(eventId) },
    include: {
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  });

  if (!event) {
    throw new Error('Event not found');
  }

  if (event._count.registrations >= event.capacity) {
    throw new Error('Event is full');
  }

  const existingRegistration = await prisma.registration.findUnique({
    where: {
      userId_eventId: {
        userId: parseInt(userId),
        eventId: parseInt(eventId),
      },
    },
  });

  if (existingRegistration) {
    throw new Error('User already registered for this event');
  }

  return await prisma.registration.create({
    data: {
      userId: parseInt(userId),
      eventId: parseInt(eventId),
    },
    include: {
      event: true,
      user: true,
    },
  });
};

export const cancelRegistration = async (registrationId) => {
  return await prisma.registration.delete({
    where: { id: parseInt(registrationId) },
  });
};

export const getAllRegistrations = async () => {
  return await prisma.registration.findMany({
    include: {
      user: {
        select: {
          fullName: true,
          email: true,
        },
        event: {
          select: {
            title: true,
            date: true,
            location: true,
          },
        },
      },
    },
  });
};
