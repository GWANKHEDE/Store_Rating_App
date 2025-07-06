
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { name, email, password, address, role = 'USER' } = req.body;

    if (name.length < 20 || name.length > 60) {
      return res.status(400).json({ error: 'Name must be between 20 and 60 characters' });
    }
    if (address.length > 400) {
      return res.status(400).json({ error: 'Address must be less than 400 characters' });
    }
    if (password.length < 8 || password.length > 16 || 
        !/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
      return res.status(400).json({ 
        error: 'Password must be 8-16 characters with at least one uppercase and one special character' 
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true
      }
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role
      },
      token 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    if (newPassword.length < 8 || newPassword.length > 16 || 
        !/[A-Z]/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
      return res.status(400).json({ 
        error: 'Password must be 8-16 characters with at least one uppercase and one special character' 
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;
    
    const where = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (address) where.address = { contains: address, mode: 'insensitive' };
    if (role) where.role = role;

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        stores: {
          select: {
            id: true,
            name: true,
            ratings: {
              select: {
                value: true
              }
            }
          }
        }
      }
    });

    const usersWithRatings = users.map(user => {
      if (user.role === 'STORE_OWNER' && user.stores.length > 0) {
        const store = user.stores[0];
        const ratings = store.ratings.map(r => r.value);
        const avgRating = ratings.length > 0 ? 
          (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;
        return { ...user, avgRating };
      }
      return user;
    });

    res.json(usersWithRatings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        stores: {
          select: {
            id: true,
            name: true,
            ratings: {
              select: {
                value: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role === 'STORE_OWNER' && user.stores.length > 0) {
      const store = user.stores[0];
      const ratings = store.ratings.map(r => r.value);
      user.avgRating = ratings.length > 0 ? 
        (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  changePassword,
  getAllUsers,
  getUserById
};
