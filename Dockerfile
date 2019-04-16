FROM keymetrics/pm2:10-alpine
RUN apk add tzdata
RUN apk add dpkg
ENV TZ=Asia/Shanghai
ENV NODE_ENV=production
ENV LOG_PATH=/var/logs
RUN ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime
RUN echo ${TZ} > /etc/timezone
RUN npm install yarn -g
RUN npm install typescript -g
RUN mkdir -p /usr/share/pardjs-users-service
WORKDIR /usr/share/pardjs-users-service
COPY . /usr/share/pardjs-users-service
RUN yarn
RUN yarn run build
RUN rm -rf ./src
RUN ls -al
CMD yarn run start:prod