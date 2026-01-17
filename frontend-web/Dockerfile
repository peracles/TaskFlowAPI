FROM node:24.13.0-alpine
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 5173
# --host es vital para que Docker permita ver la web desde fuera
CMD ["pnpm", "dev", "--host"]