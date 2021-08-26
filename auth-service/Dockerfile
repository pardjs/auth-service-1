FROM keymetrics/pm2:16-buster
COPY ./package.json /usr/share/pardjs-service
COPY ./package-lock.json /usr/share/pardjs-service
RUN npm install
COPY . /usr/share/pardjs-service
RUN npm run build
RUN rm -rf ./src
RUN ls -al
CMD npm run start:prod