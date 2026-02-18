# Express API Generator 📦

This project is an Express.js API generator that provides a structured template for APIs using MongoDB or SQL databases.

## 🚀 Features

- Pre-configured authentication (Register, Login)
- Supports MongoDB (Mongoose) and SQL (Sequelize)
- Centralized logging and response handling
- Integrated Swagger API documentation

## 💻 Usage

```bash
npm run dev        # Start development server with nodemon
npm start          # Start production server
npm run lint       # Check code quality
npm run lint:fix   # Auto-fix linting issues
npm run format     # Format code with Prettier
```

## 🗄️ Database Management

This project uses Sequelize CLI for database migrations and seeders:

```bash
# Migrations
npm run migration:create create-users-table  # Create new migration
npm run db:migrate                          # Run migrations
npm run db:migrate:undo                     # Undo last migration

# Seeders
npm run seed:create demo-users    # Create new seeder
npm run db:seed                   # Run all seeders
npm run db:seed:undo              # Undo all seeders

# Models
npm run model:create User --attributes "name:string,email:string"
```

📚 **For detailed documentation, see [DATABASE.md](./DATABASE.md)**

---
