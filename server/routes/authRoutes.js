const express = require('express');
const router  = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/Register', registerUser);
router.post('/Login',    loginUser);
router.get ('/Profile',  protect, getUserProfile);
router.put ('/Profile',  protect, updateUserProfile);

module.exports = router;