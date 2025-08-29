const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {
  validateProduct,
  validateStockUpdate,
  validateIdParam,
  validateQueryParams
} = require('../middleware/validation');

router.get('/', validateQueryParams, productController.getAllProducts);
router.get('/:id', validateIdParam, productController.getProductById);
router.post('/', validateProduct, productController.createProduct);
router.put('/:id', validateIdParam, validateProduct, productController.updateProduct);
router.delete('/:id', validateIdParam, productController.deleteProduct);
router.patch('/:id/stock', validateIdParam, validateStockUpdate, productController.addStock);

module.exports = router;