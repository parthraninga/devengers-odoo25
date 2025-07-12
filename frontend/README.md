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
- React.js with JSX
- Vite as build tool
- Tailwind CSS for styling
- shadcn-ui component library
- Context API for state management
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Multer for file uploads
- Cloudinary for image storage
- Redis for caching and rate limiting

## Repository

- GitHub: [Rewear-odoo](https://github.com/Pushkar111/Rewear-odoo)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
