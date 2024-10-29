# Use the official Node.js image
FROM node:18.14.1 as build

# Set the working directory
WORKDIR /app
#COPY ./package.json /usr/interviewBE/

# Copy the entire app directory first
COPY package*.json ./


# Install dependencies
RUN npm install && npm i -g pm2

COPY . .
# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
