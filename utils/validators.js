const { Product } = require('../models');

// Kumpulan custom validators untuk validasi data spesifik
const customValidators = {
  // Mengecek apakah produk dengan ID tertentu ada di database
  isProductExists: async (value) => {
    const product = await Product.findByPk(value);
    if (!product) {
      throw new Error('Produk tidak ditemukan');
    }
    return true;
  },

  // Mengecek apakah SKU unik (khusus untuk update produk)
  isSkuUnique: async (value, { req }) => {
    const productId = req.params.id;
    const product = await Product.findOne({ where: { sku: value } });
    
    // Jika SKU ditemukan dan bukan milik produk yang sedang diupdate
    if (product && product.id !== parseInt(productId)) {
      throw new Error('SKU sudah digunakan oleh produk lain');
    }
    return true;
  },

  // Mengecek apakah kode transaksi unik
  isTransactionCodeUnique: async (value) => {
    const { Transaction } = require('../models');
    const transaction = await Transaction.findOne({ where: { transaction_code: value } });
    
    if (transaction) {
      throw new Error('Kode transaksi sudah digunakan');
    }
    return true;
  }
};

module.exports = customValidators;