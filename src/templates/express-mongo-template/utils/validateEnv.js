/**
 * Environment Variables Validator
 * Validates required environment variables on application startup
 * Prevents runtime errors by failing fast if critical config is missing
 */

const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'NODE_ENV'];

const optionalEnvVars = {
  EMAIL_USER: 'Email functionality will be disabled',
  EMAIL_PASS: 'Email functionality will be disabled',
  ENABLE_CRON_JOBS: 'Cron jobs will be disabled',
};

/**
 * Validate environment variables
 * @throws {Error} If required environment variables are missing
 */
function validateEnv() {
  const missing = [];
  const warnings = [];

  // Check required variables
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  });

  // Check optional variables
  Object.keys(optionalEnvVars).forEach(varName => {
    if (!process.env[varName]) {
      warnings.push(`${varName}: ${optionalEnvVars[varName]}`);
    }
  });

  // Validate JWT_SECRET in production
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      missing.push('JWT_SECRET (must be at least 32 characters in production)');
    }
  }

  // Display warnings
  if (warnings.length > 0) {
    console.warn('\n⚠️  Optional environment variables not set:');
    warnings.forEach(warning => {
      console.warn(`   - ${warning}`);
    });
    console.warn('');
  }

  // Fail if required variables are missing
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
