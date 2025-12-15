# Use specific Node.js version with Alpine for smaller size
FROM node:20-alpine AS build

WORKDIR /app

# Copy only package files first for better caching
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies with optimizations for low-memory systems
RUN yarn install --frozen-lockfile --production=false --network-timeout 100000 --cache-folder /tmp/.yarn-cache

# Copy source code
COPY . .

# Build arguments
ARG VITE_APP_BACKEND_URL
ARG VITE_APP_ENVIRONMENT
ARG VITE_APP_GOOGLE_MAP_API_KEY

# Set environment variables
ENV VITE_APP_BACKEND_URL=$VITE_APP_BACKEND_URL
ENV VITE_APP_ENVIRONMENT=$VITE_APP_ENVIRONMENT
ENV VITE_APP_GOOGLE_MAP_API_KEY=$VITE_APP_GOOGLE_MAP_API_KEY
ENV NODE_OPTIONS="--max-old-space-size=1024"
ENV GENERATE_SOURCEMAP=false
ENV ESLINT_NO_DEV_ERRORS=true

RUN echo "Using backend URL: $VITE_APP_BACKEND_URL"
RUN yarn build

# Production stage with Alpine nginx for smaller size
FROM nginx:1.29.0-alpine AS production

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/default.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx: /app

CMD ["nginx", "-g", "daemon off;"]