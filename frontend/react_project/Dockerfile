# -----------------------------------
# 1) Build 阶段：用 Node 去跑 npm run build
# -----------------------------------
    FROM node:16-alpine AS build

    WORKDIR /app
    
    # 先拷贝 package.json / lockfile，并安装依赖
    COPY package.json package-lock.json ./
    RUN npm ci
    
    # 构建时注入前端环境变量
    ARG REACT_APP_DIGIT_OCEAN_API_URL=''
    ENV REACT_APP_DIGIT_OCEAN_API_URL=${REACT_APP_DIGIT_OCEAN_API_URL}
    
    # 再把源代码拷进来，执行打包
    COPY . .
    RUN npm run build
    
    # -----------------------------------
    # 2) 运行阶段：用 nginx 提供静态文件
    # -----------------------------------
    FROM nginx:alpine
    
    # 删除默认配置，拷贝生产专用的 nginx.conf
    RUN rm /etc/nginx/conf.d/default.conf
    COPY nginx.prod.conf /etc/nginx/conf.d/
    
    # 把 build 出来的静态文件复制进去
    COPY --from=build /app/build /usr/share/nginx/html
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    