# Build stage
FROM node:18-slim AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
# Note: GEMINI_API_KEY should be provided as an env var or build arg if needed during build
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copy the build output to nginx folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run expects the container to listen on $PORT, default is 8080
ENV PORT 8080
EXPOSE 8080

# Start nginx
CMD ["sh", "-c", "nginx -g 'daemon off;'"]
