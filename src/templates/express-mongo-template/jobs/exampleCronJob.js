const cron = require('node-cron');
const mongoose = require('mongoose');
const User = require('../models/User');

const exampleCronJob = () => {
  
  cron.schedule('0 0 * * *', async () => {
    console.log('🕐 Daily cron job started at:', new Date().toISOString());
    
    try {
      
      const userCount = await User.countDocuments();
      console.log(`📊 Total users in database: ${userCount}`);
      
      
      
    } catch (error) {
      console.error('❌ Daily cron job error:', error);
    }
    
    console.log('✅ Daily cron job completed');
  });

  
  cron.schedule('0 * * * *', async () => {
    console.log('🕐 Hourly maintenance job started at:', new Date().toISOString());
    
    try {
      
      
      
      console.log('🧹 Performing hourly maintenance...');
      
    } catch (error) {
      console.error('❌ Hourly maintenance error:', error);
    }
    
    console.log('✅ Hourly maintenance completed');
  });

  
  cron.schedule('*/5 * * * *', () => {
    console.log('⏰ Health check - System is running at:', new Date().toISOString());
  });

  console.log('🚀 Cron jobs initialized successfully');
};


const weeklyCleanupJob = () => {
  
  cron.schedule('0 2 * * 0', async () => {
    console.log('🕐 Weekly cleanup started at:', new Date().toISOString());
    
    try {
      
      
      
      console.log('🧹 Performing weekly cleanup...');
      
    } catch (error) {
      console.error('❌ Weekly cleanup error:', error);
    }
    
    console.log('✅ Weekly cleanup completed');
  });
};


const customJob = (schedule, taskName, taskFunction) => {
  if (!cron.validate(schedule)) {
    console.error('❌ Invalid cron schedule:', schedule);
    return;
  }
  
  cron.schedule(schedule, async () => {
    console.log(`🕐 ${taskName} started at:`, new Date().toISOString());
    
    try {
      await taskFunction();
      console.log(`✅ ${taskName} completed`);
    } catch (error) {
      console.error(`❌ ${taskName} error:`, error);
    }
  });
  
  console.log(`🎯 Custom job "${taskName}" scheduled with: ${schedule}`);
};


const stopAllJobs = () => {
  cron.getTasks().forEach((task) => {
    task.destroy();
  });
  console.log('🛑 All cron jobs stopped');
};

module.exports = {
  exampleCronJob,
  weeklyCleanupJob,
  customJob,
  stopAllJobs
};