FROM node:12-alpine

RUN apk add --no-cache udev ttf-freefont chromium git
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

EXPOSE 5000
EXPOSE 3000

WORKDIR /app

# CMD [ “npm”, “start” ]