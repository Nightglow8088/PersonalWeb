# PersonalWeb

# DigitOcean
ssh -i ~/.ssh/id_rsa_digitalocean root@147.182.199.216

cd srv/blog
./deploy.sh

npm run build     
docker build -t kevinb8080/blog-frontend:latest .
docker push kevinb8080/blog-frontend:latest 

maven->lifecycle->package
docker build -t kevinb8080/blog-backend:latest .  
docker push kevinb8080/blog-backend:latest 




# Docker更新
如果你本地开发和测试使用的是没有用户名前缀的镜像（如 frontend_react:latest），而你推送到 Docker Hub 的镜像使用的是带用户名前缀的（如 kevinb8080/frontend_react:latest），这两者其实是独立的镜像。这种情况下，你可能希望保持两个镜像版本的同步更新，特别是在本地测试通过后。

为什么需要同步更新？
一致性： 确保本地开发环境与生产环境使用的是同一版本的应用，这有助于减少环境间的差异导致的问题。
测试： 确保在本地进行的测试与生产环境中运行的应用相匹配，避免部署后发现新的问题。
更新本地镜像：
如果你希望更新本地的 frontend_react:latest 镜像，并保持与 kevinb8080/frontend_react:latest 的同步，你可以按照以下步骤操作：

构建新的本地镜像：

bash
复制代码
docker build -t frontend_react:latest .
确保你的 Dockerfile 和应用代码都是最新的。

标记并推送带用户名的镜像： 如果你需要同时更新 Docker Hub 上的镜像，你可以通过重新标记本地镜像并推送来完成：

bash
复制代码
# 重新标记本地镜像为带有用户名的镜像
docker tag frontend_react:latest kevinb8080/frontend_react:latest

# 推送更新到 Docker Hub
docker push kevinb8080/frontend_react:latest
通过这样的方式，你可以确保你的本地开发镜像和你推送到 Docker Hub 的镜像保持一致，有助于简化开发和部署流程。如果你的本地开发直接使用的是带用户名的镜像（kevinb8080/frontend_react:latest），那么只需构建并更新这一个镜像即可。

docker build -t kevinb8080/frontend_react:latest --no-cache .
 docker push kevinb8080/frontend_react:latest    
 docker pull kevinb8080/frontend_react:latest
docker run -d -p 80:80 kevinb8080/frontend_react:latest


docker pull kevinb8080/backend_spring:latest
docker run -d -p 8080:8080 kevinb8080/backend_spring:latest




<!-- 

第一组：

 1. no feeling about moster/ model
 2. password sequence
 3. san 
 4, jump care san low / open door
 5. light wight > sendor 

第二组：
1. sequence
2.  -->
