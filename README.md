# Real Estate Platform

A full-stack Real Estate web application designed to provide a modern platform for browsing and managing property-related information.

The application consists of a **Next.js frontend** and an **Express.js backend**, following a separate client-server architecture.

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Axios
* React Hook Form
* Zod
* Leaflet
* React Leaflet
* Swiper
* Radix UI
* Lucide Icons

### Backend

* Node.js
* Express.js
* MySQL
* Sequelize
* JWT Authentication
* bcryptjs
* Express Session
* Multer
* Nodemailer
* dotenv
* CORS
* Cookie Parser

---

# Project Structure

```bash
real-estate/
│
├── Frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── styles/
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── next.config.mjs
│
└── Server/
    ├── controllers/
    ├── middleware/
    ├── modules/
    ├── routes/
    ├── utils/
    ├── evernalServer.js
    └── package.json
```

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Pijushpatra2/real-estate.git
```

Navigate to the project directory:

```bash
cd real-estate
```

---

# Frontend Setup

Navigate to the frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend runs on:

```bash
http://localhost:3008
```

---

# Backend Setup

Open another terminal and navigate to the server directory:

```bash
cd Server
```

Install dependencies:

```bash
npm install
```

Run the backend in development mode:

```bash
npm run dev
```

For production:

```bash
npm start
```

---

# Environment Variables

Create a `.env` file inside the `Server` directory.

Example:

```env
PORT=5000

DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

> Never upload your `.env` file or sensitive credentials to GitHub.

---

# Available Frontend Scripts

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Run Linting

```bash
npm run lint
```

---

# Available Backend Scripts

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

# Architecture

The application follows a separated frontend and backend architecture.

```text
User
 │
 ▼
Next.js Frontend
 │
 │ API Requests
 ▼
Express.js Backend
 │
 ├── Controllers
 ├── Routes
 ├── Middleware
 └── Database Models
 │
 ▼
MySQL Database
```

---

# Backend Features

The backend includes technologies for:

* Authentication and authorization
* Password encryption using bcrypt
* JWT-based authentication
* Session management
* Database management using MySQL and Sequelize
* File uploads using Multer
* Email functionality using Nodemailer
* Request validation
* Middleware-based request handling
* Cross-Origin Resource Sharing (CORS)

---

# Frontend Features

The frontend is built using modern React and Next.js technologies with support for:

* Modern responsive UI
* Component-based architecture
* TypeScript
* Tailwind CSS styling
* Form handling and validation
* Interactive UI components
* Animations using Framer Motion
* Maps and location functionality using Leaflet
* Carousels and sliders
* Reusable UI components

---

# Maps

The project includes mapping functionality using:

* Leaflet
* React Leaflet

This can be used to provide location-based property experiences and interactive maps.

---

# Screenshots

Add screenshots of your application here.

```text
/screenshots/home.png
/screenshots/property-details.png
/screenshots/login.png
```

Example:

```md
![Home Page](./screenshots/home.png)
```

---

# Future Improvements

* Improve property search and filtering
* Add advanced property management
* Improve user dashboard functionality
* Add property favorites
* Add advanced location search
* Improve image management
* Add notifications
* Improve SEO
* Add automated testing
* Add deployment documentation

---

# Author

**Pijush Patra**

Full Stack Developer

GitHub: https://github.com/Pijushpatra2

---

# License

This project is currently intended for personal and development purposes.

---

If you like this project, consider giving the repository a star!
