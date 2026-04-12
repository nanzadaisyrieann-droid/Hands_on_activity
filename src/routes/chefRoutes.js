const express = require('express');
const router = express.Router();

// Import everything from ONE controller only
const {
  getAllChefs,
  createChefs,
  getChefById,
  updateChef,
  deleteChef,
} = require('../controllers/chefController');

// Routes
router.get('/chefs', getAllChefs);
router.post('/chefs', createChefs);
router.get('/chefs/:id', getChefById);
router.put('/chefs/:id', updateChef);
router.delete('/chefs/:id', deleteChef);

module.exports = router;
