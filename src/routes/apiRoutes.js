const express = require('express');
const router = express.Router();

const {
  getAllDishes,
  createDish,
  getDishById,
  updateDish,
  deleteDish,
} = require('../controllers/dishController');

const { protect, authorize } = require('../middleware/authMiddleware');

const { registerUser, loginUser } = require('../controllers/authController');

// AUTH ROUTES
router.post('/register', registerUser);
router.post('/login', loginUser);

// DISH ROUTES
router.get('/dishes', getAllDishes);
router.get('/dishes/:id', getDishById);
router.post('/dishes', protect, authorize('admin', 'manager'), createDish);
router.put('/dishes/:id', protect, authorize('admin', 'manager'), updateDish);
router.delete('/dishes/:id', protect, authorize('admin', 'manager'), deleteDish);

module.exports = router;