# Activity Booking Backend

A Node.js backend application for managing and booking activities.

## Features

- User authentication and authorization
- Activity management
- Activity booking system
- Saved activities functionality
- RESTful API endpoints

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The server will start running on `http://localhost:5000` (or the port specified in your .env file).

## API Endpoints

### Activities
- `GET /api/activities` - Get all activities
- `POST /api/activities/book` - Book an activity
- `GET /api/activities/saved` - Get saved activities

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

## Project Structure

```
├── controllers/         # Route controllers
├── models/             # Database models
├── routes/             # API routes
├── middleware/         # Custom middleware
├── config/            # Configuration files
└── .env               # Environment variables
```

## Error Handling

The application includes comprehensive error handling for:
- Authentication errors
- Database operations
- Invalid requests
- Server errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 