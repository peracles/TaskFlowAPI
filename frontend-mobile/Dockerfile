FROM node:24.13.0-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
EXPOSE 8081
CMD ["pnpm", "exec", "expo", "start", "--host", "lan"]