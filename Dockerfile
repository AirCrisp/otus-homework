FROM mhart/alpine-node:16
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --prod

FROM mhart/alpine-node:slim-16

WORKDIR /app
COPY --from=0 /app .
COPY . .
CMD ["node", "index.js"]