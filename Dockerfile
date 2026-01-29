# Use specific Node.js version with Alpine for smaller size
FROM node:22-alpine AS build

# Build argument to specify which app to build (admin-app or user-app)
ARG APP_NAME=admin-app

WORKDIR /app

# Copy workspace configuration files
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Copy all package.json files for dependency resolution
COPY apps/${APP_NAME}/package.json ./apps/${APP_NAME}/
COPY packages/shared/package.json ./packages/shared/

# Install pnpm and dependencies
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate
RUN pnpm install --frozen-lockfile --filter=${APP_NAME} --filter=@initia/shared

# Copy source code for the app and shared package
COPY apps/${APP_NAME} ./apps/${APP_NAME}
COPY packages/shared ./packages/shared

# Copy config files
COPY tsconfig.json ./
COPY tsconfig.base.json ./

# Build arguments for environment variables
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

# Build the specified app
WORKDIR /app/apps/${APP_NAME}
RUN echo "Building ${APP_NAME} with backend URL: $VITE_APP_BACKEND_URL"
RUN pnpm build

# Production stage with Alpine nginx for smaller size
FROM nginx:1.29.0-alpine AS production

ARG APP_NAME=admin-app

WORKDIR /app

# Copy built app from build stage
COPY --from=build /app/apps/${APP_NAME}/dist ./build
COPY default.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx: /app

CMD ["nginx", "-g", "daemon off;"]