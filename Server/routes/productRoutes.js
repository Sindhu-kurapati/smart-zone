const {Router} = require('express');

const { createProduct, getProducts, getSingleProduct, editProduct, deleteProduct } = require('../controllers/productControllers')
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.post('/', authMiddleware, createProduct)
router.get('/', getProducts)
router.get('/product/:id', getSingleProduct)
router.patch('/:id',authMiddleware ,editProduct)
router.delete('/:id', authMiddleware, deleteProduct)

module.exports = router;