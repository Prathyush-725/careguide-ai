FROM node:22-bookworm-slim
WORKDIR /app

COPY package.json ./
COPY backend/package.json backend/package-lock.json ./backend/
COPY frontend/package.json frontend/package-lock.json ./frontend/
COPY backend ./backend
COPY frontend ./frontend

RUN npm run build

ENV NODE_ENV=production
EXPOSE 8080
CMD ["npm", "start"]
