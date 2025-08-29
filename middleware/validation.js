const { body, param, query, validationResult } = require('express-validator');

// Aturan validasi untuk produk
const validateProduct = [
  body('name')
    .notEmpty()
    .withMessage('Nama produk wajib diisi')
    .isLength({ max: 255 })
    .withMessage('Nama produk tidak boleh lebih dari 255 karakter'),
  
  body('price')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Harga harus berupa angka desimal yang valid')
    .custom(value => value >= 0)
    .withMessage('Harga tidak boleh bernilai negatif'),
  
  body('stock_quantity')
    .isInt({ min: 0 })
    .withMessage('Jumlah stok harus berupa bilangan bulat non-negatif'),
  
  body('sku')
    .optional()
    .isLength({ max: 100 })
    .withMessage('SKU tidak boleh lebih dari 100 karakter'),
  
  // Middleware untuk menangani error validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Terdapat kesalahan validasi',
        errors: errors.array()
      });
    }
    next();
  }
];

// Aturan validasi untuk transaksi
const validateTransaction = [
  body('payment_method')
    .isIn(['cash', 'card', 'e-wallet'])
    .withMessage('Metode pembayaran harus berupa cash, card, atau e-wallet'),
  
  body('cashier_name')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Nama kasir tidak boleh lebih dari 100 karakter'),
  
  body('items')
    .isArray({ min: 1 })
    .withMessage('Items harus berupa array yang tidak kosong'),
  
  body('items.*.product_id')
    .isInt({ min: 1 })
    .withMessage('ID produk harus berupa bilangan bulat positif'),
  
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Jumlah quantity harus berupa bilangan bulat positif'),
  
  // Middleware untuk menangani error validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Terdapat kesalahan validasi',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validasi untuk pembaruan stok
const validateStockUpdate = [
  body('quantity')
    .isInt({ min: 1 })
    .withMessage('Jumlah quantity harus berupa bilangan bulat positif'),
  
  // Middleware untuk menangani error validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Terdapat kesalahan validasi',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validasi untuk parameter ID
const validateIdParam = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID harus berupa bilangan bulat positif'),
  
  // Middleware untuk menangani error validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Terdapat kesalahan validasi',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validasi untuk parameter query
const validateQueryParams = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Halaman harus berupa bilangan bulat positif'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit harus berada di antara 1 hingga 100'),
  
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Harga minimum harus berupa angka non-negatif'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Harga maksimum harus berupa angka non-negatif'),
  
  query('minStock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stok minimum harus berupa bilangan bulat non-negatif'),
  
  query('maxStock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stok maksimum harus berupa bilangan bulat non-negatif'),
  
  // Middleware untuk menangani error validasi
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Terdapat kesalahan validasi',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateProduct,
  validateTransaction,
  validateStockUpdate,
  validateIdParam,
  validateQueryParams
};