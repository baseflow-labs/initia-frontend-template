FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# COPY .env ./
ARG REACT_APP_BACKEND_URL
ARG ENVIRONMENT

ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV ENVIRONMENT=$ENVIRONMENT

RUN echo "Using backend URL: $REACT_APP_BACKEND_URL"
RUN npm run build

FROM nginx:1.29.0 AS production

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/default.conf /etc/nginx/conf.d/default.conf
RUN chown -R nginx: /app

CMD ["nginx", "-g", "daemon off;"]