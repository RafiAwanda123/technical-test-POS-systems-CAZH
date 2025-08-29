const { Transaction, TransactionItem, Product } = require('../models');
const InventoryService = require('./inventoryService');
const { sequelize } = require('../models');
const { Sequelize } = require('sequelize');

class TransactionService {
  /**
   * Memproses transaksi penjualan baru
   * @param {Object} transactionData - Data transaksi
   * @param {Array} items - Item-item dalam transaksi
   * @returns {Promise<Transaction>} Transaksi yang berhasil dibuat
   * @throws {Error} Jika terjadi error dalam proses transaksi
   */
  static async processTransaction(transactionData, items) {
    const transaction = await sequelize.transaction();
    
    try {
      console.log('Memproses transaksi dengan data:', transactionData);
      console.log('Items:', items);

      // Validasi semua item dan cek stok
      for (const item of items) {
        console.log('Memeriksa stok untuk product_id:', item.product_id, 'quantity:', item.quantity);
        await InventoryService.checkStockAvailability(item.product_id, item.quantity);
      }
      
      // Hitung total amount
      let totalAmount = 0;
      const itemDetails = [];
      
      for (const item of items) {
        console.log('Mengambil detail product_id:', item.product_id);
        const product = await Product.findByPk(item.product_id, { transaction });
        
        if (!product) {
          throw new Error(`Product dengan ID ${item.product_id} tidak ditemukan`);
        }
        
        console.log('Product ditemukan:', product.name, 'Stok:', product.stock_quantity);
        
        const subtotal = product.price * item.quantity;
        totalAmount += subtotal;
        
        itemDetails.push({
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: product.price,
          subtotal: subtotal
        });
      }
      
      // Generate transaction code
      const timestamp = Date.now();
      const random = Math.random().toString(36).substr(2, 5).toUpperCase();
      const transactionCode = `TXN-${timestamp}-${random}`;
      
      // Buat record transaksi
      console.log('Membuat record transaksi dengan total amount:', totalAmount);
      const newTransaction = await Transaction.create({
        ...transactionData,
        transaction_code: transactionCode, // Pastikan transaction_code diisi
        total_amount: totalAmount
      }, { transaction });
      
      // Buat record transaction items
      for (const item of itemDetails) {
        console.log('Membuat transaction item untuk product_id:', item.product_id);
        await TransactionItem.create({
          transaction_id: newTransaction.id,
          ...item
        }, { transaction });
      }
      
      // Kurangi stok produk
      console.log('Mengurangi stok produk');
      await InventoryService.reduceMultipleStocks(items, transaction);
      
      // Commit transaksi
      console.log('Commit transaksi');
      await transaction.commit();
      
      console.log('Transaksi berhasil dengan ID:', newTransaction.id);
      
      return await Transaction.findByPk(newTransaction.id, {
        include: [{
          model: TransactionItem,
          as: 'items',
          include: [{
            model: Product,
            as: 'product'
          }]
        }]
      });
    } catch (error) {
      // Tambahkan logging error yang detail
      console.error('ERROR dalam processTransaction:', error.message);
      console.error(error.stack);
      
      // Rollback transaksi jika terjadi error
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * Mendapatkan riwayat transaksi dengan filter opsional
   * @param {Object} filters - Filter untuk pencarian transaksi
   * @param {number} limit - Jumlah maksimal transaksi yang diambil
   * @param {number} offset - Offset untuk pagination
   * @returns {Promise<Array>} Array of transactions
   */
  static async getTransactionHistory(filters = {}, limit = 10, offset = 0) {
    try {
      const whereClause = {};
      
      // Filter berdasarkan tanggal jika provided
      if (filters.startDate && filters.endDate) {
        whereClause.created_at = {
          [Sequelize.Op.between]: [new Date(filters.startDate), new Date(filters.endDate)]
        };
      } else if (filters.startDate) {
        whereClause.created_at = {
          [Sequelize.Op.gte]: new Date(filters.startDate)
        };
      } else if (filters.endDate) {
        whereClause.created_at = {
          [Sequelize.Op.lte]: new Date(filters.endDate)
        };
      }
      
      // Filter berdasarkan payment method jika provided
      if (filters.paymentMethod) {
        whereClause.payment_method = filters.paymentMethod;
      }
      
      // Gunakan Transaction yang sudah diimport
      const transactions = await Transaction.findAll({
        where: whereClause,
        include: [{
          model: TransactionItem,
          as: 'items',
          include: [{
            model: Product,
            as: 'product',
            attributes: ['id', 'name', 'description', 'price', 'sku']
          }]
        }],
        order: [['created_at', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      // Hitung total count untuk pagination
      const totalCount = await Transaction.count({ where: whereClause });
      
      return {
        transactions,
        totalCount
      };
    } catch (error) {
      console.error('Error in getTransactionHistory:', error);
      throw error;
    }
  }

  /**
   * Mendapatkan detail transaksi by ID
   * @param {number} transactionId - ID transaksi
   * @returns {Promise<Transaction>} Detail transaksi
   * @throws {Error} Jika transaksi tidak ditemukan
   */
  static async getTransactionDetail(transactionId) {
    const transaction = await Transaction.findByPk(transactionId, {
      include: [{
        model: TransactionItem,
        as: 'items',
        include: [{
          model: Product,
          as: 'product'
        }]
      }]
    });
    
    if (!transaction) {
      throw new Error(`Transaksi ID ${transactionId} tidak ditemukan`);
    }
    
    return transaction;
  }
}

module.exports = TransactionService;