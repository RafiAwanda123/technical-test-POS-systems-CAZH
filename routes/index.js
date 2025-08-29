const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const transactionRoutes = require('./transactionRoutes');

router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Point Of Sale System API - Backend Developer Technical Test CAZH',
    version: '1.0.0',
    endpoints: {
      products: {
        'GET /api/products': 'Mendapatkan semua produk',
        'GET /api/products/:id': 'Mendapatkan detail produk',
        'POST /api/products': 'Membuat produk baru',
        'PUT /api/products/:id': 'Mengupdate produk',
        'DELETE /api/products/:id': 'Menghapus produk',
        'PATCH /api/products/:id/stock': 'Menambah stok produk'
      },
      transactions: {
        'POST /api/transactions': 'Memproses transaksi baru',
        'GET /api/transactions': 'Mendapatkan riwayat transaksi',
        'GET /api/transactions/:id': 'Mendapatkan detail transaksi'
      }
    },
    documentation: 'Lihat README.md untuk informasi lebih lanjut'
  });
});

// Gunakan routes yang telah dibuat
router.use('/products', productRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;