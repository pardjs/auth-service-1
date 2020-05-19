docker login --username=do021 registry.cn-shanghai.aliyuncs.com --password $DOCKER_PASSWORD_DOZTO
docker build . -t registry.cn-shanghai.aliyuncs.com/pardjs/auth-service:$1
echo prepared to push registry.cn-shanghai.aliyuncs.com/pardjs/auth-service:$1
docker push registry.cn-shanghai.aliyuncs.com/pardjs/auth-service:$1
echo registry.cn-shanghai.aliyuncs.com/pardjs/auth-service:$1 pushed