FROM node:9.10.0-alpine
RUN apk update \
    && apk upgrade \
    && apk add ncurses \
    && apk add git

RUN mkdir -p /app
COPY ./evilangel.com/main /app/evilangel.com/main
COPY ./shared /app/shared
WORKDIR /app/evilangel.com/main
RUN npm install
RUN npm run install-flowplayer
RUN npm run link-ea-components
RUN npm run prod-build

ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["./node_modules/.bin/nuxt", "start"]
