const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Nama produk tidak boleh kosong'
      },
      len: {
        args: [1, 255],
        msg: 'Nama produk harus antara 1 hingga 255 karakter'
      }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        msg: 'Harga harus berupa angka desimal'
      },
      min: {
        args: [0],
        msg: 'Harga tidak boleh negatif'
      }
    }
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isInt: {
        msg: 'Stok harus berupa bilangan bulat'
      },
      min: {
        args: [0],
        msg: 'Stok tidak boleh negatif'
      }
    }
  },
  sku: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: {
      msg: 'SKU harus unik'
    },
    validate: {
      notEmpty: {
        msg: 'SKU tidak boleh kosong'
      },
      len: {
        args: [1, 100],
        msg: 'SKU harus antara 1 hingga 100 karakter'
      }
    }
  }
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  hooks: {
    beforeCreate: (product) => {
      // Generate SKU otomatis jika tidak disediakan
      if (!product.sku) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 5).toUpperCase();
        product.sku = `SKU-${timestamp}-${random}`;
      }
    }
  }
});

module.exports = Product;