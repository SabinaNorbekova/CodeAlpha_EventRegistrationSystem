import prisma from '../config/db.js';

export const createEvent = async (title, description, date, location, capacity) => {
  return await prisma.event.create({
    data: {
      title,
      description,
      date: new Date(date),
      location,
      capacity: parseInt(capacity),
    },
  });
};

export const getAllEvents = async () => {
  return await prisma.event.findMany({
    include: {
      _count: {
        select: { registrations: true },
      },
    },
    orderBy: {
      date: 'asc',
    },
  });
};

export const getEventById = async (id) => {
  return await prisma.event.findUnique({
    where: { id: parseInt(id) },
    include: {
      registrations: {
        include: {
          user: {
            select: { id: true, fullName: true, email: true },
          },
        },
      },
      _count: {
        select: { registrations: true },
      },
    },
  });
};

export const updateEvent = async (id, data) => {
  return await prisma.event.update({
    where: { id: parseInt(id) },
    data: {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
      capacity: data.capacity ? parseInt(data.capacity) : undefined,
    },
  });
};

export const deleteEvent = async (id) => {
  return await prisma.event.delete({
    where: { id: parseInt(id) },
  });
};
