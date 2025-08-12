# How to build/run (from this directory)
#   docker build -t ytkwon91/taek-story-user:0.1 .
#   docker push ytkwon91/taek-story-user:0.1

# Node builder
ARG NODE_VERSION=node:18.20.0
FROM ${NODE_VERSION} AS builder

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build for k8s environment (uses .env.k8s via --mode k8s)
RUN npm run build:k8s


# Runtime image (nginx)
FROM nginx:1.27-alpine AS runtime

# Use nginx default config for SPA fallback
RUN printf 'server {\n  listen 80;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / { try_files $uri /index.html; }\n}\n' \
  > /etc/nginx/conf.d/default.conf

# Static assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


