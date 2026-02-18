/**
 * Environment Variables Validator
 * Validates required environment variables on application startup
 * Prevents runtime errors by failing fast if critical config is missing
 */

const requiredEnvVars = [
  'PORT',
  'DB_HOST',
  'DB_USER',
  'DB_NAME',
  'DB_DIALECT',
  'JWT_SECRET',
  'NODE_ENV',
];

const optionalEnvVars = {
  DB_PASS: 'Database password not set (may be required)',
  DB_PORT: 'Database port not set (will use default)',
  EMAIL_USER: 'Email functionality will be disabled',
  EMAIL_PASS: 'Email functionality will be disabled',
  ENABLE_CRON_JOBS: 'Cron jobs will be disabled',
};

function validateEnv() {
  const missing = [];
  const warnings = [];

  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  Object.keys(optionalEnvVars).forEach(varName => {
    if (!process.env[varName]) {
      warnings.push(`${varName}: ${optionalEnvVars[varName]}`);
    }
  });

  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      missing.push('JWT_SECRET (must be at least 32 characters in production)');
    }
  }

  if (warnings.length > 0) {
    console.warn('\n⚠️  Optional environment variables not set:');
    warnings.forEach(warning => {
      console.warn(`   - ${warning}`);
    });
    console.warn('');
  }

  if (missing.length > 0) {
    console.error('\n❌ Missing required environment variables:');
    missing.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('\n💡 Please check your .env file\n');
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  console.log('✅ Environment variables validated successfully');
}

module.exports = { validateEnv };
