const { Sequelize } = require('sequelize');
class Helpers {
  // Generate kode transaksi unik
  static generateTransactionCode() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `TXN-${timestamp}-${random}`;
  }

  // Generate SKU unik
  static generateSku() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `SKU-${timestamp}-${random}`;
  }

  // Format mata uang
  static formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  }

  // Hitung metadata pagination
  static getPaginationMetadata(totalItems, page, limit) {
    const totalPages = Math.ceil(totalItems / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;
    return {
      currentPage: page,
      totalPages,
      totalItems,
      itemsPerPage: limit,
      hasNext,
      hasPrev
    };
  }

  // Bangun where clause untuk filtering
  static buildWhereClause(filters) {
    const whereClause = {};
    const { minPrice, maxPrice, minStock, maxStock, startDate, endDate } = filters;
    if (minPrice !== undefined || maxPrice !== undefined) {
      whereClause.price = {};
      if (minPrice !== undefined) whereClause.price[Sequelize.Op.gte] = parseFloat(minPrice);
      if (maxPrice !== undefined) whereClause.price[Sequelize.Op.lte] = parseFloat(maxPrice);
    }
    if (minStock !== undefined || maxStock !== undefined) {
      whereClause.stock_quantity = {};
      if (minStock !== undefined) whereClause.stock_quantity[Sequelize.Op.gte] = parseInt(minStock);
      if (maxStock !== undefined) whereClause.stock_quantity[Sequelize.Op.lte] = parseInt(maxStock);
    }
    if (startDate !== undefined || endDate !== undefined) {
      whereClause.created_at = {};
      if (startDate !== undefined) whereClause.created_at[Sequelize.Op.gte] = new Date(startDate);
      if (endDate !== undefined) whereClause.created_at[Sequelize.Op.lte] = new Date(endDate);
    }
    return whereClause;
  }
}
module.exports = Helpers;
