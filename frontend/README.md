# ReWear - Sustainable Fashion Exchange Platform

## Odoo Hackathon 2025 Project

ReWear is a sustainable fashion platform that enables users to exchange clothing items through a points-based system, reducing waste and promoting circular fashion.

## Project Structure

This project follows a full-stack architecture with separate frontend and backend:

- **Frontend**: React.js with Vite, Tailwind CSS, and shadcn-ui components
- **Backend**: Node.js with Express, MongoDB, and Cloudinary for image storage

## Features

- 👕 Clothing item listings with detailed descriptions and multiple images
- 🔄 Swap system using points based on item condition
- 👍 Like system for favorite items
- 👤 User profiles with authentication
- 🔍 Search and filter items by category, size, condition, etc.
- 🌙 Dark/light mode support
- 📱 Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (v16+) and npm
- MongoDB
- Cloudinary account for image storage

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Pushkar111/Rewear-odoo.git
cd Rewear-odoo
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory with the following:
```
PORT=3001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

5. Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:3001
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Access the application at `http://localhost:5173`

## Development Notes

- Image uploads have a 5MB size limit per file
- Supported image formats: JPG, PNG, GIF
- User authentication uses JWT tokens with refresh mechanism

## Troubleshooting Common Issues

- **"File too large" error**: Make sure uploaded images are under 5MB each
- **"Only image files are allowed"**: Check that the file format is supported (JPG, PNG, GIF)
- **Route conflict errors**: Check that specific routes (like `/swaps/history`) are defined before parameterized routes (like `/swaps/:id`)
- **API connection issues**: Ensure backend server is running and frontend environment variables are correctly set

## Tech Stack

### Frontend
- **Framework**: React.js with JSX
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: 
  - Tailwind CSS for utility-first styling
  - shadcn-ui component library for consistent UI elements
  - Dark/light mode theming support
- **State Management**: 
  - Context API with custom hooks
  - Multiple context providers (Auth, Admin, Socket, Theme)
- **HTTP Client**: Axios with interceptors for API requests
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**:
  - Custom reusable components
  - Responsive layouts with mobile-first design
- **Navigation**: React Router v6 with protected routes
- **Notifications**: React Hot Toast for user notifications
- **Real-time Features**: Socket.io client for chat and notifications

### Backend
- **Runtime**: Node.js with Express framework
- **Database**: 
  - MongoDB with Mongoose ODM
  - Data validation with Zod schemas
- **Authentication**: 
  - JWT for token-based authentication
  - Passport.js for OAuth strategies
  - Multiple login methods:
    - Email/password authentication
    - Google OAuth
    - Facebook OAuth
    - Twitter OAuth
    - Apple Sign In
- **File Handling**:
  - Multer for file uploads and validation
  - Cloudinary for cloud image storage and transformations
- **Caching & Performance**:
  - Redis for data caching
  - Rate limiting middleware for API protection
  - Response compression
- **Real-time Communication**: 
  - Socket.io for bidirectional communication
  - Real-time chat functionality
  - Live notifications
- **Security**:
  - Helmet for securing HTTP headers
  - CORS configuration
  - Input sanitization
  - XSS protection
- **Email & SMS**:
  - Nodemailer for transactional emails
  - Twilio integration for SMS notifications and OTP
- **Job Processing**:
  - Redis-based queue for background processing
  - Worker processes for handling asynchronous tasks

## Repository

- GitHub: [Rewear-odoo](https://github.com/Pushkar111/Rewear-odoo)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
