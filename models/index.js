const { sequelize } = require('../config/database');
const Product = require('./productModel');
const Transaction = require('./transactionModel');
const TransactionItem = require('./transactionItemModel');

// Definisikan hubungan antar model
Transaction.hasMany(TransactionItem, {
  foreignKey: 'transaction_id',
  as: 'items',
  onDelete: 'CASCADE'
});

TransactionItem.belongsTo(Transaction, {
  foreignKey: 'transaction_id',
  as: 'transaction'
});

TransactionItem.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

Product.hasMany(TransactionItem, {
  foreignKey: 'product_id',
  as: 'transaction_items'
});

// Synchronize model dengan database
const syncModels = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('Model berhasil disinkronisasi dengan database');
  } catch (error) {
    console.error('Gagal mensinkronisasi model dengan database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  Product,
  Transaction,
  TransactionItem,
  syncModels
};