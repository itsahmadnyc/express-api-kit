require('dotenv').config();

// Validate environment variables FIRST before anything else
const { validateEnv } = require('./utils/validateEnv');
validateEnv();

const app = require('./app');
const { connectDB } = require('./config/database');
const { displayBanner } = require('./utils/banner');

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      displayBanner();
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📖 API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`💾 Database: ${process.env.DB_DIALECT || 'mysql'}`);
      console.log(`⚡ Ready to handle requests!\n`);
    });
  })
  .catch(err => {
    console.error('❌ Server failed to start:', err);
  });
