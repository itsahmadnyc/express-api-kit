const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT, // 'mysql' or 'postgres'
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQL Database Connected...');
    await sequelize.sync(); 
    console.log('✅ Database Synced...');
  } catch (error) {
    console.error('❌ SQL Database Connection Error:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
