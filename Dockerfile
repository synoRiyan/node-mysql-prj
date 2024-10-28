# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the entire app directory first
COPY app/ .

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
