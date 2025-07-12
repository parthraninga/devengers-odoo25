# Stage 1: Build the frontend
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only the frontend folder content
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copy the rest of the frontend source code
COPY frontend ./

# Build the frontend using Vite
RUN npm run build

# Stage 2: Serve the built frontend using nginx
FROM nginx:alpine

# Copy built output from the builder stage to nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
