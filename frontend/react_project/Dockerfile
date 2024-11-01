# 第一阶段：构建
# 使用node镜像作为基础镜像进行构建
FROM node:16-alpine as build

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json文件
COPY package.json package-lock.json ./

# 安装依赖
RUN npm install

# 复制剩余的源代码
COPY . .

# 构建应用
RUN npm run build

# 第二阶段：部署
# 使用nginx作为服务器，提供React构建的静态文件
FROM nginx:alpine

# 从构建阶段复制构建好的文件到nginx目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 当容器启动时运行nginx
CMD ["nginx", "-g", "daemon off;"]
