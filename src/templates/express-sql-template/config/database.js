const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: process.env.DB_DIALECT, // 'mysql' or 'postgres'
  logging: false,
  pool: {
    max: parseInt(process.env.DB_POOL_MAX) || 5,
    min: parseInt(process.env.DB_POOL_MIN) || 0,
    acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
    idle: parseInt(process.env.DB_POOL_IDLE) || 10000,
  },
  retry: {
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /ETIMEDOUT/,
      /ESOCKETTIMEDOUT/,
      /EHOSTUNREACH/,
      /EPIPE/,
      /EAI_AGAIN/,
    ],
    max: 3,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQL Database Connected...');
    console.log(
      `📊 Connection Pool: Max ${sequelize.options.pool.max}, Min ${sequelize.options.pool.min}`
    );
    await sequelize.sync();
    console.log('✅ Database Synced...');
  } catch (error) {
    console.error('❌ SQL Database Connection Error:', error);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await sequelize.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
};

const getConnectionInfo = () => {
  return {
    totalConnections: sequelize.connectionManager.pool.size,
    idleConnections: sequelize.connectionManager.pool.available.length,
    usedConnections: sequelize.connectionManager.pool.used.length,
    pendingConnections: sequelize.connectionManager.pool.pending.length,
  };
};

process.on('SIGINT', async () => {
  console.log('🔄 Gracefully shutting down...');
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Gracefully shutting down...');
  await closeDB();
  process.exit(0);
});

module.exports = { sequelize, connectDB, closeDB, getConnectionInfo };
