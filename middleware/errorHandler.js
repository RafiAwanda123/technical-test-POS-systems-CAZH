const ErrorService = require('../services/errorService');

// Middleware untuk menangani semua jenis error dalam aplikasi
const errorHandler = (err, req, res, next) => {
  console.error('Stack error:', err.stack);
  
  // Menangani error validasi Sequelize
  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map(error => ({
      field: error.path,
      message: error.message
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Terdapat kesalahan validasi data',
      errors
    });
  }
  
  // Menangani error constraint unik Sequelize (duplikasi data)
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'Data sudah ada, tidak boleh duplikat',
      field: err.errors[0].path
    });
  }
  
  // Menangani error constraint foreign key Sequelize
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'ID referensi tidak valid atau tidak ditemukan'
    });
  }
  
  // Menangani error kustom dari logika bisnis
  const errorResponse = ErrorService.formatErrorResponse(err);
  res.status(errorResponse.status).json(errorResponse);
};

module.exports = errorHandler;