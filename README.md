# ResolveIt - Enterprise Ticketing System

ResolveIt is a full-stack, production-ready complaint and ticketing management system built with a modern 3-tier architecture. It features a stunning glassmorphic React frontend, a robust Node.js/Express backend, and MySQL database integration.

## Features
- **Beautiful UI**: Built with React and Vite, featuring rich glassmorphism, dynamic animations, and premium graphics.
- **Authentication**: JWT-based secure login with Role-Based Access Control (RBAC).
- **Offline Mock Mode**: Explore the dashboard UI without needing a running database via built-in demo credentials.
- **RESTful API**: Clean, modular backend architecture using controllers, models, and routes.
- **File Uploads**: AWS S3 integration via Multer for attaching files safely to tickets.
- **Analytics Dashboard**: Real-time visual metrics, performance indicators, and category distribution.

## Tech Stack
- **Frontend**: React 18, Vite, React Router DOM, Axios, Vanilla CSS.
- **Backend**: Node.js, Express, MySQL2, AWS SDK, Multer-S3, JSON Web Tokens (JWT), Bcrypt.

## Quick Start

### 1. Backend Setup
```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your MySQL and AWS S3 credentials

# Initialize the Database (creates schema and tables)
node init-db.js

# Start the Node backend server
npm start
```

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

## Demo Access
If your local MySQL database is currently offline or unconfigured, you can still explore the beautiful frontend UI using the offline mock credentials:
- **Email**: `demo@admin.com`
- **Password**: `admin123`

## License
MIT
