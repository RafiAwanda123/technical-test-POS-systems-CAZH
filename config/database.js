const {Sequelize} = require('sequelize')
require('dotenv').config()

// Mengkonfigurasi koneksi MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        dialecOptions: {
            dicemalNumbers: true,
            supportBigNumbers: true,
            bigNumberStrings: false
        }, timezone: '+07:00'
    }
)

// Test koneksi databased
const testConnection = async() => {
    try{
        await sequelize.authenticate();
        console.log('Koneksi Database berhasil dibuat');
    } catch (error) {
        console.log('Tidak dapat terhubung database', error.message);
        process.exit(1);
    }
}

module.exports = {sequelize, testConnection};