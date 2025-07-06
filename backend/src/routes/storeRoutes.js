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

router.get('/', getAllStores);
router.get('/:id', getStoreById);

router.post('/', auth, adminAuth, addStore);
router.post('/rate', auth, submitRating);

router.get('/dashboard/stats', auth, adminAuth, getDashboardStats);

router.get('/dashboard/owner', auth, storeOwnerAuth, getStoreOwnerDashboard);

module.exports = router;
