const ProductService = require('../services/productService');
const ErrorService = require('../services/errorService');

const productController = {
  /**
   * Melihat sebuah produk
   * GET /api/products
   */
  getAllProducts: async (req, res) => {
    try {
      const { minStock, maxStock, minPrice, maxPrice } = req.query;
      const filters = { minStock, maxStock, minPrice, maxPrice };
      
      const products = await ProductService.getAllProducts(filters);
      
      const response = ErrorService.formatSuccessResponse(products);
      res.status(200).json(response);
    } catch (error) {
      const errorResponse = ErrorService.formatErrorResponse(error);
      res.status(errorResponse.status).json(errorResponse);
    }
  },

  /**
   * Melihat produk dari id
   * GET /api/products/:id
   */
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(parseInt(id));
      
      const response = ErrorService.formatSuccessResponse(product);
      res.status(200).json(response);
    } catch (error) {
      const errorResponse = ErrorService.formatErrorResponse(error);
      res.status(errorResponse.status).json(errorResponse);
    }
  },

  /**
   * Membuat produk baru
   * POST /api/products
   */
  createProduct: async (req, res) => {
    try {
      const productData = req.body;
      const product = await ProductService.createProduct(productData);
      
      const response = ErrorService.formatSuccessResponse(product, 201);
      res.status(201).json(response);
    } catch (error) {
      const errorResponse = ErrorService.formatErrorResponse(error);
      res.status(errorResponse.status).json(errorResponse);
    }
  },

  /**
   * Edit produk atau update
   * PUT /api/products/:id
   */
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const productData = req.body;
      const product = await ProductService.updateProduct(parseInt(id), productData);
      
      const response = ErrorService.formatSuccessResponse(product);
      res.status(200).json(response);
    } catch (error) {
      const errorResponse = ErrorService.formatErrorResponse(error);
      res.status(errorResponse.status).json(errorResponse);
    }
  },

  /**
   * menghapus produk
   * DELETE /api/products/:id
   */
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(parseInt(id));
      
      const response = ErrorService.formatSuccessResponse(
        { message: 'Produk berhasil dihapus' }
      );
      res.status(200).json(response);
    } catch (error) {
      const errorResponse = ErrorService.formatErrorResponse(error);
      res.status(errorResponse.status).json(errorResponse);
    }
  },

  /**
   * Menambah stok pada produk
   * PATCH /api/products/:id/stock
   */
  addStock: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      
      const product = await ProductService.addStock(parseInt(id), parseInt(quantity));
      
      const response = ErrorService.formatSuccessResponse(product);
      res.status(200).json(response);
    } catch (error) {
      const errorResponse = ErrorService.formatErrorResponse(error);
      res.status(errorResponse.status).json(errorResponse);
    }
  }
};

module.exports = productController;