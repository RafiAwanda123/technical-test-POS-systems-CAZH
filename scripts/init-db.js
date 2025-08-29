const { syncModels } = require('../models');
const { sequelize } = require('../config/database');


// Test koneksi database
const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Koneksi database berhasil');

    await syncModels();
    
    console.log('Database berhasil diinisialisasi');
  } catch (error) {
    console.error('Gagal menginisialisasi database:', error.message);
    process.exit(1);
  }
};

// Jalankan inisialisasi jika file ini dijalankan langsung
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };