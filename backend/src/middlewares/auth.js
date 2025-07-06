
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true }
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const adminAuth = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).send({ error: 'Access denied. Admin rights required.' });
  }
  next();
};

const storeOwnerAuth = (req, res, next) => {
  if (req.user.role !== 'STORE_OWNER') {
    return res.status(403).send({ error: 'Access denied. Store owner rights required.' });
  }
  next();
};

module.exports = { auth, adminAuth, storeOwnerAuth };
