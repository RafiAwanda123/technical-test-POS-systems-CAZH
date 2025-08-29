const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

const {
  validateTransaction,
  validateIdParam,
  validateQueryParams
} = require('../middleware/validation');

router.post('/', validateTransaction, transactionController.processTransaction);
router.get('/', validateQueryParams, transactionController.getTransactionHistory);
router.get('/:id', validateIdParam, transactionController.getTransactionById);

module.exports = router;