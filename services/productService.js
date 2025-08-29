const { Product } = require('../models');

class ProductService {
  /**
   * Mendapatkan semua produk dengan filter opsional
   * @param {Object} filters - Filter untuk pencarian produk
   * @returns {Promise<Array>} Array of products
   */
  static async getAllProducts(filters = {}) {
    const whereClause = {};
    
    // Filter berdasarkan stok jika provided
    if (filters.minStock !== undefined) {
      whereClause.stock_quantity = {
        [Sequelize.Op.gte]: parseInt(filters.minStock)
      };
    }
    
    if (filters.maxStock !== undefined) {
      whereClause.stock_quantity = {
        ...whereClause.stock_quantity,
        [Sequelize.Op.lte]: parseInt(filters.maxStock)
      };
    }
    
    // Filter berdasarkan harga jika provided
    if (filters.minPrice !== undefined) {
      whereClause.price = {
        [Sequelize.Op.gte]: parseFloat(filters.minPrice)
      };
    }
    
    if (filters.maxPrice !== undefined) {
      whereClause.price = {
        ...whereClause.price,
        [Sequelize.Op.lte]: parseFloat(filters.maxPrice)
      };
    }
    
    return await Product.findAll({
      where: whereClause,
      order: [['name', 'ASC']]
    });
  }

  /**
   * Mendapatkan detail produk by ID
   * @param {number} productId - ID produk
   * @returns {Promise<Product>} Detail produk
   * @throws {Error} Jika produk tidak ditemukan
   */
  static async getProductById(productId) {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      throw new Error(`Produk dengan ID ${productId} tidak ada dalam sistem.`);
    }
    
    return product;
  }

  /**
   * Membuat produk baru
   * @param {Object} productData - Data produk
   * @returns {Promise<Product>} Produk yang berhasil dibuat
   */
  static async createProduct(productData) {
    return await Product.create(productData);
  }

  /**
   * Mengupdate produk
   * @param {number} productId - ID produk
   * @param {Object} productData - Data produk yang diupdate
   * @returns {Promise<Product>} Produk yang berhasil diupdate
   * @throws {Error} Jika produk tidak ditemukan
   */
  static async updateProduct(productId, productData) {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      throw new Error(`Product dengan ID ${productId} tidak ada dalam sistem.`);
    }
    
    return await product.update(productData);
  }

  /**
   * Menghapus produk
   * @param {number} productId - ID produk
   * @returns {Promise<boolean>} True jika berhasil dihapus
   * @throws {Error} Jika produk tidak ditemukan
   */
  static async deleteProduct(productId) {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      throw new Error(`Produk dengan ID ${productId} tidak ada dalam sistem.`);
    }
    
    await product.destroy();
    return true;
  }

  /**
   * Menambah stok produk
   * @param {number} productId - ID produk
   * @param {number} quantity - Jumlah yang ditambahkan
   * @returns {Promise<Product>} Produk dengan stok yang telah diupdate
   * @throws {Error} Jika produk tidak ditemukan
   */
  static async addStock(productId, quantity) {
    const product = await Product.findByPk(productId);
    
    if (!product) {
      throw new Error(`Produk dengan ID ${productId} tidak ada dalam sistem.`);
    }
    
    product.stock_quantity += quantity;
    return await product.save();
  }
}

module.exports = ProductService;