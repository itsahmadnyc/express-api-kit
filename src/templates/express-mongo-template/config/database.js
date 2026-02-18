const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE) || 10,
      minPoolSize: parseInt(process.env.MONGO_MIN_POOL_SIZE) || 5,
      maxIdleTimeMS: parseInt(process.env.MONGO_MAX_IDLE_TIME) || 30000,
      serverSelectionTimeoutMS: parseInt(process.env.MONGO_SERVER_SELECTION_TIMEOUT) || 5000,
      socketTimeoutMS: parseInt(process.env.MONGO_SOCKET_TIMEOUT) || 45000,
      connectTimeoutMS: parseInt(process.env.MONGO_CONNECT_TIMEOUT) || 10000,
      heartbeatFrequencyMS: parseInt(process.env.MONGO_HEARTBEAT_FREQUENCY) || 10000,
      retryWrites: true,
      retryReads: true,
      readPreference: process.env.MONGO_READ_PREFERENCE || 'primary',
      writeConcern: {
        w: process.env.MONGO_WRITE_CONCERN || 'majority',
        j: true,
        wtimeout: parseInt(process.env.MONGO_WRITE_TIMEOUT) || 5000,
      },
      readConcern: {
        level: process.env.MONGO_READ_CONCERN || 'majority',
      },
      bufferCommands: false,
      bufferMaxEntries: 0,
    });

    console.log('✅ MongoDB Connected...');
    console.log(
      `📊 Connection Pool: Max ${mongoose.connection.options.maxPoolSize}, Min ${mongoose.connection.options.minPoolSize}`
    );
    console.log(`📈 Read Preference: ${mongoose.connection.options.readPreference}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error closing MongoDB connection:', error);
  }
};

const getConnectionInfo = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  return {
    state: states[state] || 'unknown',
    host: mongoose.connection.host,
    port: mongoose.connection.port,
    name: mongoose.connection.name,
    collections: Object.keys(mongoose.connection.collections),
    poolSize: mongoose.connection.options?.maxPoolSize || 'default',
  };
};

const getConnectionStats = () => {
  if (mongoose.connection.db) {
    return mongoose.connection.db.admin().serverStatus();
  }
  return null;
};

mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', err => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

process.on('SIGINT', async () => {
  console.log('🔄 Gracefully shutting down MongoDB...');
  await closeDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Gracefully shutting down MongoDB...');
  await closeDB();
  process.exit(0);
});

module.exports = { connectDB, closeDB, getConnectionInfo, getConnectionStats };
