# Use the official Node.js 22.17.1 image as the base image
FROM node:22.17.1-alpine

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev

# Copy the rest of the application source code into the container
COPY . .

# Expose the port your application will run on
EXPOSE 4444

# Set the default command to run your application
CMD ["node", "index.js"]
