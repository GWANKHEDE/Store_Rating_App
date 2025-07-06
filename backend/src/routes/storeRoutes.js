// backend/src/routes/storeRoutes.js

const express = require('express');
const router = express.Router();
const { 
  addStore, 
  getAllStores, 
  getStoreById, 
  submitRating,
  getDashboardStats,
  getStoreOwnerDashboard
} = require('../controllers/storeController');
const { auth, adminAuth, storeOwnerAuth } = require('../middlewares/auth');

// Public routes
router.get('/', getAllStores);
router.get('/:id', getStoreById);

// Protected routes
router.post('/', auth, adminAuth, addStore);
router.post('/rate', auth, submitRating);

// Admin dashboard
router.get('/dashboard/stats', auth, adminAuth, getDashboardStats);

// Store owner dashboard
router.get('/dashboard/owner', auth, storeOwnerAuth, getStoreOwnerDashboard);

module.exports = router;
