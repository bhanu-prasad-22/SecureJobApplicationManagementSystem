# Secure Job Application Management System

A full-stack web application for securely managing job applications with JWT-based authentication, built with Spring Boot and React.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Docker Deployment](#docker-deployment)
- [API Documentation](#api-documentation)
- [Security Features](#security-features)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This project is a secure job application management system designed to help users track, manage, and organize their job applications in one centralized platform. The system provides secure authentication, data validation, and a responsive user interface.

## ✨ Features

- **User Authentication & Authorization**: JWT-based authentication with Spring Security
- **Job Application Tracking**: Create, read, update, and delete job applications
- **Secure Data Storage**: PostgreSQL database with secure password handling
- **Responsive UI**: Modern React frontend with Tailwind CSS
- **Form Validation**: Client and server-side validation for data integrity
- **RESTful API**: Well-structured REST endpoints for application management
- **Docker Support**: Containerized deployment for both frontend and backend

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.3
- **Language**: Java 21
- **ORM**: Spring Data JPA
- **Authentication**: Spring Security with JWT (JSON Web Tokens)
- **Database**: PostgreSQL
- **Build Tool**: Maven
- **Testing**: Spring Boot Test, Spring Security Test

### Frontend
- **Framework**: React 19
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Linting**: ESLint

### DevOps
- **Containerization**: Docker
- **Container Registry**: Docker Hub ready

## 📁 Project Structure

```
SecureJobApplicationManagementSystem/
├── backend/                    # Spring Boot application
│   ├── src/
│   │   ├── main/java/
│   │   │   └── com/example/
│   │   └── test/
│   ├── pom.xml                # Maven configuration
│   ├── Dockerfile             # Backend Docker image
│   ├── HELP.md               # Backend documentation
│   └── mvnw                  # Maven wrapper scripts
│
├── frontend/                   # React application
│   ├── src/                   # React components & pages
│   ├── public/                # Static assets
│   ├── package.json           # NPM dependencies
│   ├── Dockerfile             # Frontend Docker image
│   ├── vite.config.js         # Vite configuration
│   └── tailwind.config.js     # Tailwind CSS configuration
│
└── README.md                   # This file
```

## 📦 Prerequisites

- **Java**: JDK 21 or higher
- **Node.js**: v16 or higher
- **npm**: v8 or higher (comes with Node.js)
- **PostgreSQL**: v12 or higher
- **Docker**: (optional, for containerized deployment)
- **Git**: For cloning the repository

## 🚀 Installation & Setup

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   ./mvnw clean install
   ```
   (On Windows: `mvnw.cmd clean install`)

3. **Configure PostgreSQL:**
   - Create a PostgreSQL database:
     ```sql
     CREATE DATABASE jobtracker_db;
     ```
   - Update `src/main/resources/application.properties` with your database credentials:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/jobtracker_db
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     spring.jpa.hibernate.ddl-auto=update
     ```

4. **Run the backend:**
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoint:**
   - Update the API base URL in your axios configuration to point to your backend:
     ```javascript
     // Example: src/api/axiosConfig.js
     const API_BASE_URL = 'http://localhost:8080/api';
     ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

## 🎮 Running the Application

### Development Mode

1. **Start PostgreSQL** (if not running):
   ```bash
   # Linux/Mac
   brew services start postgresql
   
   # Windows (if installed via installer)
   # Services panel -> PostgreSQL
   ```

2. **Start the backend:**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

3. **In a new terminal, start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open your browser:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8080/api`

## 🐳 Docker Deployment

### Building Docker Images

1. **Backend:**
   ```bash
   cd backend
   docker build -t jobtracker-backend:latest .
   ```

2. **Frontend:**
   ```bash
   cd frontend
   docker build -t jobtracker-frontend:latest .
   ```

### Running with Docker Compose

Create a `docker-compose.yml` file in the root directory:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: jobtracker_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/jobtracker_db
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: password
    depends_on:
      - postgres

  frontend:
    build:
      context: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend

volumes:
  postgres_data:
```

Run with Docker Compose:
```bash
docker-compose up
```

## 📚 API Documentation

### Authentication Endpoints

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Logout**: `POST /api/auth/logout`

### Job Application Endpoints

- **Get all applications**: `GET /api/applications`
- **Get single application**: `GET /api/applications/{id}`
- **Create application**: `POST /api/applications`
- **Update application**: `PUT /api/applications/{id}`
- **Delete application**: `DELETE /api/applications/{id}`

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Spring Security**: Configured for role-based access control
- **Password Encoding**: Secure password hashing and validation
- **CORS Configuration**: Configured to prevent unauthorized requests
- **Input Validation**: Server-side validation using Spring Validation
- **Database Security**: Encrypted connections to PostgreSQL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

---

## 📧 Support

For support, please open an issue in the repository or contact the project maintainers.

## 🔗 Quick Links

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/)
- [React Documentation](https://react.dev)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
