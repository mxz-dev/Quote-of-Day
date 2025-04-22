# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY ./qoute/package.json ./qoute/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the project files
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev", "--", "--host"]
