FROM node:lts AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
# Copying these first allows Docker to cache this step if dependencies don't change
COPY package*.json ./

# Install dependencies
# Use npm ci for clean installs in CI/CD or production builds
RUN npm ci

# Copy the rest of your application code
COPY . .

# Build the React application
# This creates the production build in the 'build' folder (by default)
RUN npm run build


# Stage 2: Serve the application with Nginx
# Use a lightweight Nginx image for the final production image
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file into the container
COPY nginx.conf /etc/nginx/conf.d/

# Copy the built React application files from the build stage to the Nginx webroot
# The 'build' directory comes from the output of 'npm run build' in Stage 1
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80, as Nginx serves on this port by default
EXPOSE 80

# Command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]