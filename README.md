# Subscription Tracker API
A RESTful API built with Express.js for tracking user subscriptions, managing authentication, workflows, and more. This backend project uses MongoDB for data storage and follows modular architecture with middleware for error handling and access control.

## Features
- User Management (Register, Login, Profile)

- Authentication (JWT, Cookie-based)

- Subscription Management

- Workflow Management

- Middleware-based route protection & error handling

- Cookie parsing for session management

- Postman collection for testing

## Tech Stack

- Node.js

- Express.js

- MongoDB (Mongoose)

- JWT for Authentication

- Cookie-Parser

- Postman (for testing API)

## Project Structure

subscription-tracker-api

├── config/

│   └── env.js

├── database/

│   └── mongodb.js

├── middlewares/

│   ├── arcject.middleware.js

│   └── error.middleware.js

├── routes/

│   ├── auth.routes.js

│   ├── user.routes.js

│   ├── subscription.routes.js

│   └── workflow.routes.js

├── .env

├── app.js

├── package.json

└── README.md


## Installation
```bash []
git clone https://github.com/your-username/subscription-tracker-api.git
cd subscription-tracker-api
npm install
```

## Environment Variables (.env)
Create a .env file in the root directory with the following:
```.env []
PORT=5000
MONGODB_URI=mongodb://localhost:27017/subscription_tracker
JWT_SECRET=your_jwt_secret_key
COOKIE_SECRET=your_cookie_secret
```
## Running the Server
```bash[]
npm run dev
# or
node app.js
```
Server will start on:
```
http://localhost:5000
```
## API Testing (Postman)
Import the collection above to Postman to test the API endpoints.

     Click to download the Postman Collection in the above repository
   
## Endpoints Overview
| Method | Route                   | Description             |
| ------ | ----------------------- | ----------------------- |
| POST   | `/api/v1/auth/register` | Register new user       |
| POST   | `/api/v1/auth/login`    | User login              |
| GET    | `/api/v1/users/me`      | Get logged-in user info |
| POST   | `/api/v1/subscriptions` | Add new subscription    |
| GET    | `/api/v1/subscriptions` | Get all subscriptions   |
| POST   | `/api/v1/workflows`     | Create workflow         |
| GET    | `/api/v1/workflows`     | View workflows          |
