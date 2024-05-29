const {Router} = require('express');

const {registerSeller, loginSeller} = require('../controllers/sellerControllers');
// const authMiddleware = require('../middleware/authMiddleware')


const router = Router();

router.post('/seller-register', registerSeller);
router.post('/seller-login', loginSeller);


module.exports = router;