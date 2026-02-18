const { exampleCronJob, weeklyCleanupJob } = require('./exampleCronJob');

const initializeJobs = () => {
  console.log('🚀 Starting job scheduler...');

  if (process.env.ENABLE_CRON_JOBS !== 'false') {
    exampleCronJob();
    weeklyCleanupJob();

    console.log('✅ All scheduled jobs initialized');
    console.log('💡 Set ENABLE_CRON_JOBS=false in .env to disable cron jobs');
  } else {
    console.log('⏸️  Cron jobs disabled via environment variable');
  }
};

module.exports = { initializeJobs };
