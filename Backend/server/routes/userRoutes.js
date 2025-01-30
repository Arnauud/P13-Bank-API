const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const tokenValidation = require('../middleware/tokenValidation')

router.post('/signup', userController.createUser)

router.post('/login', userController.loginUser)

router.post(
  '/profile',
  tokenValidation.validateToken,
  userController.getUserProfile
)

router.put(
  '/profile',
  tokenValidation.validateToken,
  userController.updateUserProfile
)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Arnaud
// Test MongoDB connection
router.get('/test-connection', async (req, res) => {
  try {
    // Try to fetch one user from the database as a test
    const user = await User.findOne();
    if (user) {
      res.status(200).json({ message: 'MongoDB is connected and operational', sampleUser: user });
    } else {
      res.status(200).json({ message: 'MongoDB is connected but no users found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'MongoDB connection test failed', error: err.message });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router



