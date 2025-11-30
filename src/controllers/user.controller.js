import * as userService from '../services/user.service.js';

export const registerUser = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        error: 'Full name and email are required',
      });
    }

    const newUser = await userService.createUser(fullName, email);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === 'User with this email already exists') {
      return res.status(409).json({
        error: error.message,
      });
    }
    console.error(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: 'Could not fetch users',
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: 'Could not fetch user details',
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedUser = await userService.updateUser(id, data);
    res.json(updatedUser);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'Email already exists',
      });
    }
    res.status(500).json({
      error: 'Could not update user',
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.json({ message: 'User deleted succesfully' });
  } catch (error) {
    res.status(500).json({
      error: 'Could not delete user',
    });
  }
};
