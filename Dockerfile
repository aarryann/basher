# Start with a Node.js 14 base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilizes Docker cache to save re-installing dependencies if unchanged
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy application code
COPY . .

RUN npx tailwindcss -i ./main.css -o ./public/tailwind.min.css --minify
# Expose port and start application
EXPOSE 3000
CMD [ "node", "server.js" ]