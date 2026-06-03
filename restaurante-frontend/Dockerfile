FROM node:18-alpine AS builder
WORKDIR /app
ARG BACKEND_INTERNAL_URL=http://backend:8080
ARG NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
ENV BACKEND_INTERNAL_URL=${BACKEND_INTERNAL_URL}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV BACKEND_INTERNAL_URL=http://backend:8080
ENV NEXT_PUBLIC_BACKEND_URL=http://localhost:8080

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
