require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { testConnection } = require('./config/database');

const routes = require('./routes');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

testConnection();

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server berjalan dengan baik',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
    requestedUrl: req.originalUrl
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`\nMini POS API Server`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API Base URL: http://localhost:${PORT}/api`);
});

module.exports = app;