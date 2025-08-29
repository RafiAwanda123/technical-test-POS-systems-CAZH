// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/database');

// const Transaction = sequelize.define('Transaction', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   transaction_code: {
//     type: DataTypes.STRING(50),
//     allowNull: false,
//     unique: {
//       msg: 'Kode transaksi harus unik'
//     },
//     validate: {
//       notEmpty: {
//         msg: 'Kode transaksi tidak boleh kosong'
//       },
//       len: {
//         args: [1, 50],
//         msg: 'Kode transaksi harus antara 1 hingga 50 karakter'
//       }
//     }
//   },
//   total_amount: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false,
//     validate: {
//       isDecimal: {
//         msg: 'Total amount harus berupa angka desimal'
//       },
//       min: {
//         args: [0],
//         msg: 'Total amount tidak boleh negatif'
//       }
//     }
//   },
//   payment_method: {
//     type: DataTypes.ENUM('cash', 'card', 'e-wallet'),
//     allowNull: false,
//     defaultValue: 'cash',
//     validate: {
//       isIn: {
//         args: [['cash', 'card', 'e-wallet']],
//         msg: 'Metode pembayaran harus cash, card, atau e-wallet'
//       }
//     }
//   },
//   cashier_name: {
//     type: DataTypes.STRING(100),
//     allowNull: true,
//     validate: {
//       len: {
//         args: [0, 100],
//         msg: 'Nama kasir tidak boleh lebih dari 100 karakter'
//       }
//     }
//   }
// }, {
//   tableName: 'transactions',
//   timestamps: true,
//   createdAt: 'created_at',
//   updatedAt: false, // Tidak ada updated_at di tabel transactions
//   hooks: {
//     beforeCreate: (transaction) => {
//       // Generate transaction code otomatis jika tidak disediakan
//       if (!transaction.transaction_code) {
//         const timestamp = Date.now();
//         const random = Math.random().toString(36).substr(2, 5).toUpperCase();
//         transaction.transaction_code = `TXN-${timestamp}-${random}`;
//       }
//     }
//   }
// });

// module.exports = Transaction;

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