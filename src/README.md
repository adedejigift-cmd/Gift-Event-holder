# EventHorizon API

Backend API for the EventHorizon tech meetup platform.

## Features

- User registration
- Joi validation
- Password hashing with bcrypt
- User login
- JWT authentication
- Email verification
- Protected user profile
- MongoDB database

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- Joi
- bcrypt
- JSON Web Token
- Nodemailer

## Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_LINK

Navigate into the project:

cd EventHorizon

Install dependencies:

npm install

## Environment Variables

Create a `.env` file in the project root:

PORT=2500
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
FRONTEND_URL=http://localhost:5173

## Running the Application

npm run dev

The server will run on:

http://localhost:2500

## API Endpoints

### Register

POST /api/auth/register

### Login

POST /api/auth/login

### Verify Email

GET /api/auth/verify-email?token=TOKEN

### User Profile

GET /api/user/profile

