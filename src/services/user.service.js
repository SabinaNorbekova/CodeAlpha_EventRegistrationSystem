import prisma from '../config/db.js';

export const createUser = async (fullName, email) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User with this email already exsts');
  }

  return prisma.user.create({
    data: {
      fullName,
      email,
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      _count: {
        select: {
          registrations: true,
        },
      },
    },
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      registrations: {
        include: { event: true },
      },
    },
  });
};

export const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      fullName: data.fullName,
      email: data.email,
    },
  });
};

export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
};
