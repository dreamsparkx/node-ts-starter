FROM Node:22-alpine
WORKDIR /app

COPY package.json
RUN npm install -g pnpm@latest-10
RUN pnpm install
RUN pnpm build

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]