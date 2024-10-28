# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY app/package.json .
RUN npm install

# Copy the rest of the application files
COPY app/ .

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
