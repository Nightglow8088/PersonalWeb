# 1) 构建阶段：用 Node 去跑 npm run build
FROM node:16-alpine AS build
WORKDIR /app

# 安装依赖
COPY package.json package-lock.json ./
RUN npm ci

# # 构建时注入前端环境变量（可选）应该用不上 并且我已经改名统一的叫REACT_APP_API_BASE了
# ARG REACT_APP_DIGIT_OCEAN_API_URL=''
# ENV REACT_APP_DIGIT_OCEAN_API_URL=${REACT_APP_DIGIT_OCEAN_API_URL}

# 复制源码并打包
COPY . .
RUN npm run build

# 2) 运行阶段：用 nginx 提供静态文件
FROM nginx:alpine

# 直接把 build 好的文件放到默认位置
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
