const express = require('express');
const router  = express.Router();
const {
  getItems,
  addItem,
  updateItem,
  deleteItem,
  getDashboardStats,
} = require('../controllers/groceryController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Dashboard stats — MUST come before /:id route to avoid conflict
router.get('/dashboard/stats', getDashboardStats);

router.route('/')
  .get(getItems)
  .post(addItem);

router.route('/:id')
  .put(updateItem)
  .delete(deleteItem);

module.exports = router;