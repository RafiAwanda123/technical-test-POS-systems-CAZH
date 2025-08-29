const TransactionService = require('../services/transactionService');
const ErrorService = require('../services/errorService');

const transactionController = {
  /**
   * Memprosess transaksi baru
   * POST /api/transactions
   */
  processTransaction: async (req, res) => {
    try {
      const { payment_method, cashier_name, items } = req.body;
      
      const transaction = await TransactionService.processTransaction(
        { payment_method, cashier_name },
        items
      );
      
      const response = ErrorService.formatSuccessResponse(transaction, 201);
      res.status(201).json(response);
    } catch (error) {
      const errorResponse = ErrorService.formatErrorResponse(error);
      res.status(errorResponse.status).json(errorResponse);
    }
  },

  /**
   * melihat history transaksi 
   * GET /api/transactions
   */
  getTransactionHistory: async (req, res) => {
    try {
      const { startDate, endDate, paymentMethod, limit = 10, page = 1 } = req.query;
      const offset = (parseInt(page) - 1) * parseInt(limit);
      
      console.log('Fetching transaction history with params:', {
        startDate, endDate, paymentMethod, limit, page, offset
      });
      
      // Panggil service yang sudah diperbaiki
      const result = await TransactionService.getTransactionHistory(
        { startDate, endDate, paymentMethod },
        parseInt(limit),
        offset
      );
      
      // Hitung pagination info
      const totalPages = Math.ceil(result.totalCount / parseInt(limit));
      
      const response = ErrorService.formatSuccessResponse({
        transactions: result.transactions,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount: result.totalCount,
          hasNext: parseInt(page) < totalPages,
          hasPrev: parseInt(page) > 1
        }
      });
      
      res.status(200).json(response);
    } catch (error) {
      console.error('Error in getTransactionHistory controller:', error);
      const errorResponse = ErrorService.formatErrorResponse(error);
      res.status(errorResponse.status).json(errorResponse);
    }
  },

  /**
   * Melihat transaksi dari id
   * GET /api/transactions/:id
   */
  getTransactionById: async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await TransactionService.getTransactionDetail(parseInt(id));
      
      const response = ErrorService.formatSuccessResponse(transaction);
      res.status(200).json(response);
    } catch (error) {
      const errorResponse = ErrorService.formatErrorResponse(error);
      res.status(errorResponse.status).json(errorResponse);
    }
  }
};

module.exports = transactionController;