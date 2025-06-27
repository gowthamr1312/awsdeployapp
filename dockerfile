# Use the official Nginx image as the base
FROM nginx:alpine

# Remove the default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy your static site files to the nginx public directory
COPY index.html /usr/share/nginx/html/
COPY scripts.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
