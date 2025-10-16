# ============================
# Stage 1: Build React app
# ============================
FROM node:18 AS build

WORKDIR /app

# Copy dependency files first
COPY package.json package-lock.json ./

# Use a reliable registry and install dependencies
RUN npm config set registry https://registry.npmmirror.com/ \
    && (npm ci || npm install)

# Copy all app source
COPY . .

# Build React app
RUN npm run build

# ============================
# Stage 2: Serve with Nginx
# ============================
FROM nginx:stable-alpine

# Copy build output to Nginx web root
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
