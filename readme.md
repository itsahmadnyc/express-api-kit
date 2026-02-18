# Express API Kit

```
  ███████╗██╗  ██╗██████╗ ██████╗ ███████╗███████╗███████╗
  ██╔════╝╚██╗██╔╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝
  █████╗   ╚███╔╝ ██████╔╝██████╔╝█████╗  ███████╗███████╗
  ██╔══╝   ██╔██╗ ██╔═══╝ ██╔══██╗██╔══╝  ╚════██║╚════██║
  ███████╗██╔╝ ██╗██║     ██║  ██║███████╗███████║███████║
  ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝

   █████╗ ██████╗ ██╗    ██╗  ██╗██╗████████╗
  ██╔══██╗██╔══██╗██║    ██║ ██╔╝██║╚══██╔══╝
  ███████║██████╔╝██║    █████╔╝ ██║   ██║
  ██╔══██║██╔═══╝ ██║    ██╔═██╗ ██║   ██║
  ██║  ██║██║     ██║    ██║  ██╗██║   ██║
  ╚═╝  ╚═╝╚═╝     ╚═╝    ╚═╝  ╚═╝╚═╝   ╚═╝
```

🚀 **Production-Ready Express API Generator** - A powerful CLI tool that generates enterprise-grade Express.js APIs with advanced features including authentication, file uploads, cron jobs, database pooling, and comprehensive security middlewares.

## 📦 Installation

Install globally for easy access:

```bash
npm install -g express-api-kit
```

Or use directly with npx:

```bash
npx express-api-kit
```

## 🚀 Quick Start

Generate a new API project:

```bash
npx express-api-kit
```

Follow the interactive prompts:

```
? Enter project name: my-awesome-api
? Select database: MongoDB
```

Then start developing:

```bash
cd my-awesome-api
npm run dev
```

## ✨ Advanced Features

### 🔐 **Authentication & Authorization**

- JWT-based authentication with role-based access control
- Password hashing with bcryptjs
- User validation and middleware protection
- Customizable authentication flows

### 📁 **File Upload System**

- Multer-powered file upload middleware
- Configurable upload destinations and file types
- File size validation and error handling
- Automatic URL generation for uploaded files

### ⏰ **Cron Job Scheduler**

- Node-cron integration for background tasks
- Predefined job templates (daily, hourly, weekly)
- Custom job creation utilities
- Environment-based job control

### 🗄️ **Database Optimization**

- **Connection Pooling** for both SQL and MongoDB
- Advanced connection management
- Retry mechanisms and error handling
- Performance monitoring and statistics

### 🛡️ **Security & Performance**

- Helmet.js for security headers
- Rate limiting with express-rate-limit
- Request compression (gzip)
- Input validation with Joi
- CORS configuration

### 📧 **Communication & Logging**

- Nodemailer email service integration
- Winston-based structured logging
- Request/response logging with Morgan
- Custom response handlers

### 🔄 **CI/CD Pipeline**

- Automated GitHub Actions workflows
- Multi-version Node.js testing
- Code quality checks (Linting & Formatting)
- Code coverage reporting

## 🛠 Interactive Setup

The CLI will prompt you for:

- **Project Name** _(default: express-api-kit)_
- **Database Selection** _(MongoDB, MySQL, PostgreSQL)_

## 📌 Project Structure

Generated projects include a comprehensive, production-ready structure:

```
project-name/
├── config/
│   └── database.js          # Database connection with pooling
├── controllers/
│   └── auth.controller.js   # Authentication logic
├── docs/
│   ├── readme.md           # API documentation
│   ├── API_VERSIONING.md   # API versioning guide
│   └── DATABASE.md         # Database migrations guide (SQL only)
├── jobs/
│   ├── exampleCronJob.js   # Cron job templates
│   └── jobScheduler.js     # Job management system
├── middlewares/
│   ├── auth.middleware.js  # JWT & role-based authentication
│   └── upload.middleware.js # File upload handling
├── migrations/             # Database migrations (SQL only)
├── models/
│   └── User.js            # Database models (Sequelize/Mongoose)
├── routes/
│   └── v1/                # Version 1 API routes
│       ├── index.js       # V1 routes entry point
│       └── auth.routes.js # Authentication routes
├── seeders/               # Database seeders (SQL only)
├── services/
│   ├── emailService.js    # Email integration (Nodemailer)
│   └── fileService.js     # File operations utilities
├── utils/
│   ├── banner.js          # ASCII startup banner
│   ├── logger.js          # Winston logging configuration
│   └── responseHandler.js # Standardized API responses
├── view/                  # View templates (SQL template only)
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── .sequelizerc          # Sequelize CLI config (SQL only)
├── app.js                # Express application setup
├── package.json          # Dependencies & npm scripts
└── server.js             # Application entry point
```

### 📁 Folder Descriptions

- **`config/`** - Database connections, app configurations
- **`controllers/`** - Request handlers and business logic
- **`docs/`** - API documentation and guides
- **`jobs/`** - Background jobs and cron schedulers
- **`middlewares/`** - Express middlewares (auth, upload, validation)
- **`models/`** - Database schemas and models
- **`routes/`** - API endpoint definitions
- **`services/`** - Reusable business services
- **`utils/`** - Helper functions and utilities
- **`view/`** - Template files (SQL template only)

## 📜 Environment Configuration

A comprehensive **.env** file is automatically generated with optimized defaults:

### MongoDB Template:

```ini
# Server Configuration
PORT=5000
NODE_ENV=development
APP_URL=http://localhost:5000

# Database
MONGO_URI=mongodb://localhost:27017/project-name

# Authentication
JWT_SECRET=your_jwt_secret_here_minimum_32_characters

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# MongoDB Connection Pool Settings
MONGO_MAX_POOL_SIZE=10
MONGO_MIN_POOL_SIZE=5
MONGO_MAX_IDLE_TIME=30000
MONGO_SERVER_SELECTION_TIMEOUT=5000
MONGO_SOCKET_TIMEOUT=45000
MONGO_CONNECT_TIMEOUT=10000
MONGO_HEARTBEAT_FREQUENCY=10000
MONGO_READ_PREFERENCE=primary
MONGO_WRITE_CONCERN=majority
MONGO_READ_CONCERN=majority
MONGO_WRITE_TIMEOUT=5000

# Background Jobs
ENABLE_CRON_JOBS=true
```

### SQL Template (MySQL/PostgreSQL):

```ini
# Server Configuration
PORT=5000
NODE_ENV=development
APP_URL=http://localhost:5000

# Database
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=project-name
DB_DIALECT=mysql

# Authentication
JWT_SECRET=your_jwt_secret_here_minimum_32_characters

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Database Connection Pool Settings
DB_POOL_MAX=5
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000

# Background Jobs
ENABLE_CRON_JOBS=true
```

## 🏃 Running Your Project

After generation, navigate to your project and start developing:

```bash
cd my-awesome-api
npm run dev        # Development mode with nodemon
# or
npm start          # Production mode
```

You'll see the beautiful startup banner:

```
================================================================================
  ███████╗██╗  ██╗██████╗ ██████╗ ███████╗███████╗███████╗
  EXPRESS API KIT - Production Ready API Server
================================================================================
🚀 Server running on http://localhost:5000
📖 API Documentation: http://localhost:5000/api-docs
📊 Connection Pool: Max 10, Min 5
⚡ Ready to handle requests!
```

## 🎯 Built-in API Endpoints

All APIs are versioned for better evolution and backward compatibility.

### API Root

```http
GET /api    # API information and available versions
```

### Authentication Routes (v1)

```http
POST /api/v1/auth/register    # User registration
POST /api/v1/auth/login       # User authentication
GET  /api/v1/auth/profile     # Get user profile (protected)
```

## 🔄 API Versioning

Generated projects use URL path versioning (`/api/v1/`, `/api/v2/`, etc.) for:

- ✅ **Backward Compatibility** - Old clients continue working
- ✅ **Clear Evolution** - Easy to understand which version you're using
- ✅ **Gradual Migration** - Migrate clients at their own pace
- ✅ **Deprecation Strategy** - Sunset old versions gracefully

### Adding New Versions

```bash
# Create v2 directory
mkdir routes/v2

# Copy and modify routes
cp routes/v1/auth.routes.js routes/v2/auth.routes.js
```

💡 **See `docs/API_VERSIONING.md` in generated projects for detailed versioning guide.**

## 🗄️ Database Management (SQL Templates)

SQL-based projects include Sequelize CLI for database migrations and seeders:

### **Migration Commands**

```bash
npm run migration:create create-users-table  # Create a new migration
npm run db:migrate                          # Run pending migrations
npm run db:migrate:undo                     # Undo last migration
npm run db:migrate:undo:all                 # Undo all migrations
```

### **Seeder Commands**

```bash
npm run seed:create demo-users    # Create a new seeder
npm run db:seed                   # Run all seeders
npm run db:seed:undo              # Undo all seeders
```

### **Model Generation**

```bash
npm run model:create User --attributes "name:string,email:string"
```

💡 **See `docs/DATABASE.md` in generated projects for detailed examples and best practices.**

## 📦 Included Dependencies

### Core Framework

- **express** - Fast, unopinionated web framework
- **cors** - Cross-Origin Resource Sharing
- **morgan** - HTTP request logger

### Database & ORM

- **mongoose** (MongoDB) / **sequelize** (SQL)
- **mysql2** / **pg** - Database drivers

### Security & Authentication

- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token management
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting

### File Handling & Jobs

- **multer** - File upload middleware
- **node-cron** - Task scheduling

### Utilities & Performance

- **joi** - Input validation
- **compression** - Response compression
- **winston** - Advanced logging
- **nodemailer** - Email service

### Development Tools

- **nodemon** - Development auto-restart
- **eslint** - Code linting
- **prettier** - Code formatting

## 🎨 Code Quality

Every generated project includes pre-configured ESLint and Prettier for consistent code quality:

### **Linting**

```bash
npm run lint          # Check for code issues
npm run lint:fix      # Auto-fix linting issues
```

### **Formatting**

```bash
npm run format        # Format all code files
npm run format:check  # Check formatting without changes
```

### **Configuration Files**

- `eslint.config.js` - ESLint flat config with Node.js best practices
- `.prettierrc` - Prettier formatting configuration
- `.prettierignore` - Files to exclude from formatting

## 🚀 What You Get Out of the Box

✅ **Authentication System** - Complete JWT-based auth with role management  
✅ **File Upload API** - Ready-to-use file upload with validation  
✅ **Background Jobs** - Cron job system for scheduled tasks  
✅ **Database Optimization** - Connection pooling and retry mechanisms  
✅ **Database Migrations** - Sequelize CLI for schema management (SQL only)  
✅ **API Versioning** - URL path versioning for backward compatibility  
✅ **Security Features** - Rate limiting, helmet, input validation  
✅ **Professional Logging** - Structured logging with Winston  
✅ **Email Integration** - Nodemailer setup for notifications  
✅ **API Documentation** - Swagger UI ready to customize  
✅ **Code Quality Tools** - ESLint and Prettier pre-configured  
✅ **Production Ready** - Optimized configurations and error handling

## 📊 Performance Features

- **Connection Pooling**: Optimized database connections
- **Request Compression**: Automatic gzip compression
- **Rate Limiting**: Protection against abuse
- **Caching Headers**: Efficient client-side caching
- **Error Handling**: Comprehensive error management
- **Health Monitoring**: Built-in health check endpoints

## 🛠️ Customization

All generated code is fully customizable:

- **Modify authentication logic** in `controllers/auth.controller.js`
- **Add new cron jobs** in `jobs/` directory
- **Configure file uploads** in `middlewares/upload.middleware.js`
- **Adjust database settings** in `config/database.js`
- **Extend API routes** in `routes/` directory

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💙 Support & Credits

👨‍💻 **Developed by:** [Muhammad Ahmad](https://github.com/itsahmadnyc)  
📢 **If you like this tool, give it a ⭐ on GitHub!**  
🐛 **Report issues:** [GitHub Issues](https://github.com/itsahmadnyc/express-api-kit/issues)  
💬 **Discussions:** [GitHub Discussions](https://github.com/itsahmadnyc/express-api-kit/discussions)

---

**Happy Coding! 🎉**

Built with ❤️ for the developer community.
