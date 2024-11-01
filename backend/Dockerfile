# 使用 Java 17 的官方 OpenJDK 镜像作为基础镜像
FROM openjdk:17-slim

# 设置工作目录
WORKDIR /app

# 将构建的 jar 文件复制到 Docker 容器内
COPY target/*.jar app.jar

# 指定容器启动时运行 Java 应用
CMD ["java", "-jar", "/app/app.jar"]
