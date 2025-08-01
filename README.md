# Full-Stack OTP Authentication App 🔐

![Status](https://img.shields.io/badge/status-complete-brightgreen)


A complete, full-stack application demonstrating a secure user authentication system. It features user signup, login, and a "Forgot Password" flow using One-Time Passwords (OTPs) sent via email.

---

## ✨ Features

-   **User Account Management**: Secure signup and login functionality.
-   **JWT-Based Authentication**: Uses JSON Web Tokens for managing user sessions.
-   **Secure Password Storage**: Passwords are securely hashed using `bcryptjs`.
-   **OTP Password Reset**: A complete "Forgot Password" flow where users receive a 6-digit OTP via email to reset their password.
-   **Email Integration**: Uses `Nodemailer` with Gmail's SMTP server to send OTPs.
-   **RESTful API**: A well-structured backend API built with Express.js.
-   **Modern Frontend**: A responsive and interactive user interface built with React and Vite.
-   **Type-Safe Database Queries**: Utilizes Prisma ORM for robust and safe database interactions.

---

## 🛠️ Tech Stack

| Area      | Technology                                                                                                  |
| :-------- | :---------------------------------------------------------------------------------------------------------- |
| **Frontend** | React, Vite, Axios, Tailwind CSS                                                                            |
| **Backend** | Node.js, Express.js                                                                                         |
| **Database** | PostgreSQL, Prisma (ORM)                                                                                    |
| **Auth** | JWT (jsonwebtoken), bcryptjs                                                                                |
| **Emailing** | Nodemailer                                                                                                  |
| **Dev Tools** | Nodemon, Postman (for testing)                                                                              |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [PostgreSQL](https://www.postgresql.org/download/)
-   A [Gmail Account](https://mail.google.com/) with 2-Factor Authentication and an App Password enabled.

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/otp-auth-app.git](https://github.com/your-username/otp-auth-app.git)
cd otp-auth-app
2. Backend Setup
Bash

# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Set up your environment variables
# Create a .env file in the 'backend' directory and copy the contents of .env.example

# Sync the database schema with Prisma
npx prisma db push

# Start the development server (with nodemon)
npm run dev
The backend server will be running on http://localhost:5000.

3. Frontend Setup
Bash

# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
The frontend application will be available at http://localhost:5173 (or another port specified by Vite).

Environment Variables
You must create a .env file in the backend directory. Copy the following template and fill in your credentials.

Code snippet

# .env file template for the backend

# Server Port
PORT=5000

# Prisma Database URL
DATABASE_URL="postgresql://YOUR_POSTGRES_USER:YOUR_POSTGRES_PASSWORD@localhost:5432/otp_auth_db"

# JWT Secret Key
JWT_SECRET="a_very_strong_and_secret_key_that_no_one_can_guess"

# Gmail Credentials for Nodemailer
# IMPORTANT: Use an App Password, not your regular Gmail password.
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_digit_app_password
📝 API Endpoints
The backend server provides the following REST API endpoints:

Method	Endpoint	Description
POST	/api/signup	Create a new user account.
POST	/api/login	Log in a user and receive a JWT.
POST	/api/forgot-password	Request a password reset OTP via email.
POST	/api/verify-otp	Verify the OTP and set a new password.

