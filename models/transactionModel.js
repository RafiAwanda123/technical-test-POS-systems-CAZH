const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  transaction_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: 0
    }
  },
  payment_method: {
    type: DataTypes.ENUM('cash', 'card', 'e-wallet'),
    allowNull: false,
    defaultValue: 'cash'
  },
  cashier_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      len: [0, 100]
    }
  }
}, {
  tableName: 'transactions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
  hooks: {
    beforeCreate: (transaction) => {
      // Generate transaction code otomatis jika tidak disediakan
      if (!transaction.transaction_code) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 5).toUpperCase();
        transaction.transaction_code = `TXN-${timestamp}-${random}`;
      }
    }
  }
});

module.exports = Transaction;