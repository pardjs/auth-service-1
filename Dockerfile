FROM keymetrics/pm2:10-alpine
RUN apk add tzdata
RUN apk add dpkg
RUN apk add python python-dev
RUN apk add make
RUN apk add g++
ENV TZ=Asia/Shanghai
ENV NODE_ENV=production
ENV LOG_PATH=/var/logs
RUN ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime
RUN echo ${TZ} > /etc/timezone
RUN npm install yarn -g
RUN npm install typescript -g
RUN mkdir -p /usr/share/pardjs-service
WORKDIR /usr/share/pardjs-service
COPY ./package.json /usr/share/pardjs-service
COPY ./yarn.lock /usr/share/pardjs-service
RUN yarn
COPY . /usr/share/pardjs-service
RUN yarn run build
RUN rm -rf ./src
RUN ls -al
CMD yarn run start:prod