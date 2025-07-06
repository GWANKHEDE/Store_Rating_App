
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;

    if (name.length < 2 || name.length > 60) {
      return res.status(400).json({ error: 'Name must be between 2 and 60 characters' });
    }
    if (address.length > 400) {
      return res.status(400).json({ error: 'Address must be less than 400 characters' });
    }

    const owner = await prisma.user.findUnique({ where: { id: ownerId } });
    if (!owner || owner.role !== 'STORE_OWNER') {
      return res.status(400).json({ error: 'Owner must be an existing store owner' });
    }

    const existingStore = await prisma.store.findUnique({ where: { email } });
    if (existingStore) {
      return res.status(400).json({ error: 'Store email already in use' });
    }

    const store = await prisma.store.create({
      data: {
        name,
        email,
        address,
        ownerId
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllStores = async (req, res) => {
  try {
    const { name, address } = req.query;
    
    const where = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (address) where.address = { contains: address, mode: 'insensitive' };

    const stores = await prisma.store.findMany({
      where,
      include: {
        ratings: true,
        owner: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    const storesWithRatings = stores.map(store => {
      const ratings = store.ratings.map(r => r.value);
      const avgRating = ratings.length > 0 ? 
        (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;
      
      let userRating = null;
      if (req.user) {
        const userRatingObj = store.ratings.find(r => r.userId === req.user.id);
        if (userRatingObj) {
          userRating = userRatingObj.value;
        }
      }

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner,
        avgRating,
        userRating,
        totalRatings: store.ratings.length
      };
    });

    res.json(storesWithRatings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStoreById = async (req, res) => {
  try {
    const storeId = parseInt(req.params.id);
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        },
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const ratings = store.ratings.map(r => r.value);
    const avgRating = ratings.length > 0 ? 
      (ratings.reduce((a, b) => a + b, 0) / ratings.length) : 0;

    res.json({
      ...store,
      avgRating,
      ratings: store.ratings.map(r => ({
        id: r.id,
        value: r.value,
        user: r.user,
        createdAt: r.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitRating = async (req, res) => {
  try {
    const { storeId, value } = req.body;
    const userId = req.user.id;

    if (value < 1 || value > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId
        }
      }
    });

    let rating;
    if (existingRating) {
      rating = await prisma.rating.update({
        where: {
          userId_storeId: {
            userId,
            storeId
          }
        },
        data: { value },
        include: {
          store: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
    } else {
      rating = await prisma.rating.create({
        data: {
          value,
          userId,
          storeId
        },
        include: {
          store: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });
    }

    res.json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStoreOwnerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const store = await prisma.store.findFirst({
      where: { ownerId: userId },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!store) {
      return res.status(404).json({ error: 'No store found for this owner' });
    }

    const ratings = store.ratings.map(r => r.value);
    const avgRating = ratings.length > 0 ? 
      (ratings.reduce((a, b) => a + b, 0) / ratings.length) : 0;

    res.json({
      store: {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        avgRating,
        totalRatings: store.ratings.length
      },
      ratings: store.ratings.map(r => ({
        id: r.id,
        value: r.value,
        user: r.user,
        createdAt: r.createdAt
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addStore,
  getAllStores,
  getStoreById,
  submitRating,
  getDashboardStats,
  getStoreOwnerDashboard
};
