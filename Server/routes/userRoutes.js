const {Router} = require('express');

const {registerUser, loginUser} = require('../controllers/userControllers');
// const authMiddleware = require('../middleware/authMiddleware')


const router = Router();

router.post('/user-register', registerUser);
router.post('/user-login', loginUser);

module.exports = router