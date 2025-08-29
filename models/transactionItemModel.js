const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TransactionItem = sequelize.define('TransactionItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  transaction_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'transactions',
      key: 'id'
    },
    validate: {
      isInt: {
        msg: 'ID transaksi harus berupa bilangan bulat'
      }
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    },
    validate: {
      isInt: {
        msg: 'ID produk harus berupa bilangan bulat'
      }
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'Kuantitas harus berupa bilangan bulat'
      },
      min: {
        args: [1],
        msg: 'Kuantitas minimal 1'
      }
    }
  },
  unit_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'Harga satuan harus berupa angka desimal'
      },
      min: {
        args: [0],
        msg: 'Harga satuan tidak boleh negatif'
      }
    }
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'Subtotal harus berupa angka desimal'
      },
      min: {
        args: [0],
        msg: 'Subtotal tidak boleh negatif'
      }
    }
  }
}, {
  tableName: 'transaction_items',
  timestamps: false // Tidak ada timestamps di tabel ini
});

module.exports = TransactionItem;