# Express API Generator

🚀 **Express API Generator** is a powerful CLI tool that helps you quickly scaffold an Express.js API with built-in support for **MongoDB, MySQL, or PostgreSQL**. This tool ensures a well-structured Express project setup, including **environment configuration, authentication, middleware, and dependency installation**.

## 📦 Installation

Install the package globally:

```sh
npm install -g express-api-kit
```

Or use it directly with npx:

```sh
npx express-api-kit
```

## 🚀 Usage

To create a new Express API project, run:

```sh
npx express-api-kit
```

If installed globally:

```sh
express-api-kit
```

## ✨ Features

- 🔧 Auto-generates a structured Express API project
- 🗄️ Supports **MongoDB, MySQL, and PostgreSQL**
- ⚙️ Automatic **.env file** setup
- 📦 Installs dependencies automatically
- 🏗️ Pre-configured **folder structure** for scalability
- 🔐 Includes **authentication, middleware, and service layers**
- 🔄 **Interactive CLI setup** for easy customization
- 🎯 Designed for **production-ready** development

## 🛠 Interactive Setup

The CLI will prompt you for the following:

- **Project Name** *(default: express-api-kit)*
- **Database Selection** *(MongoDB, MySQL, PostgreSQL)*

Example:

```sh
? Enter project name: my-api
? Select database: MongoDB
```

## 📌 Project Structure

After running the generator, your project will have the following structure:

```
project-name/
│-- config/       # Configuration files (e.g., database connection)
│-- controllers/  # Business logic & request handling
│-- docs/         # API documentation files (Swagger/Postman)
│-- middlewares/  # Middleware functions (authentication, logging, etc.)
│-- models/       # Database models/schema (Mongoose for MongoDB, Sequelize for SQL)
│-- routes/       # Express route definitions
│-- services/     # Business logic and reusable functions
│-- utils/        # Utility/helper functions
│-- .env          # Environment variables
│-- app.js        # Express app setup & middleware configuration
│-- server.js     # Entry point - Starts the server
│-- package.json  # Project dependencies and scripts
```

## 📜 Environment Variables

A **.env** file is automatically generated with the following variables:

### For MongoDB:
```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/my-api
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

### For MySQL/PostgreSQL:
```ini
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=my-api
DB_DIALECT=your_database_dialect
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

## 🏃 Running the Project

After generation, move into the project directory and start the server:

```sh
cd my-api
npm start
```

## 💙 Support & Contribution

👨‍💻 **Developed by:** Muhammad Ahmad

📢 If you like this tool, give it a **star ⭐** on GitHub!

Feel free to **contribute** by submitting issues and pull requests.

Happy Coding! 🎉

