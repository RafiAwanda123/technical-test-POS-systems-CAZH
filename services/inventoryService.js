const { Product } = require('../models');
const { sequelize } = require('../models');

class InventoryService {
  /**
   * Cek ketersediaan stok untuk produk tertentu
   * @param {number} productId - ID produk
   * @param {number} requiredQuantity - Jumlah yang dibutuhkan
   * @throws {Error} Jika produk tidak ditemukan atau stok tidak cukup
   */
  static async checkStockAvailability(productId, requiredQuantity) {
    try{
      const product = await Product.findByPk(productId);
      
      if (!product) {
        throw new Error(`Produk dengan ID ${productId} tidak ada dalam sistem.`);
      }
      
      if (product.stock_quantity < requiredQuantity) {
        throw new Error(`Stok tidak mencukupi untuk produk ${product.name}. Tersedia: ${product.stock_quantity}, Butuh: ${requiredQuantity}`);
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Update stok produk (bisa penambahan atau pengurangan)
   * @param {number} productId - ID produk
   * @param {number} quantityChange - Perubahan jumlah stok (bisa positif atau negatif)
   * @param {Object} transaction - Opsional transaction object untuk consistency
   * @returns {Promise<Product>} Produk yang telah diupdate
   * @throws {Error} Jika produk tidak ditemukan atau stok tidak mencukupi
   */
  static async updateStock(productId, quantityChange, transaction = null) {
    const product = await Product.findByPk(productId, { transaction });
    
    if (!product) {
      throw new Error(`Produk ID ${productId} tidak ada dalam sistem.`);
    }
    
    const newStock = product.stock_quantity + quantityChange;
    
    if (newStock < 0) {
      throw new Error(`Stok tidak mencukupi untuk produk ${product.name}. sekarang: ${product.stock_quantity}, berubah menjadi: ${quantityChange}`);
    }
    
    product.stock_quantity = newStock;
    await product.save({ transaction });
    
    return product;
  }

  /**
   * Mengurangi stok untuk multiple produk
   * @param {Array} items - Array of items dengan product_id dan quantity
   * @param {Object} transaction - Opsional transaction object
   * @throws {Error} Jika ada produk dengan stok tidak mencukupi
   */
  static async reduceMultipleStocks(items, transaction = null) {
    for (const item of items) {
      await this.checkStockAvailability(item.product_id, item.quantity);
    }
    
    for (const item of items) {
      await this.updateStock(item.product_id, -item.quantity, transaction);
    }
  }
}

module.exports = InventoryService;