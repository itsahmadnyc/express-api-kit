require('dotenv').config();

// Validate environment variables FIRST before anything else
const { validateEnv } = require('./utils/validateEnv');
validateEnv();

const app = require('./app');
const { connectDB } = require('./config/database');
const { displayBanner } = require('./utils/banner');

const PORT = process.env.PORT || 5000;

displayBanner();

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📖 API Documentation: http://localhost:${PORT}/api-docs`);
      console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('⚡ Ready to handle requests!\n');
    });
  })
  .catch(err => {
    console.error('❌ Server failed to start:', err);
  });
