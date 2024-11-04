package com.example.backend.config;

import com.example.backend.tools.SnowflakeIdWorker;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SnowflakeConfig {

    @Bean
    public SnowflakeIdWorker snowflakeIdWorker() {
        // 这里的 workerId 和 datacenterId 应该根据实际情况设置
        long workerId = 1L; // 示例，应该是环境变量或配置文件中获取
        long datacenterId = 1L; // 示例，应该是环境变量或配置文件中获取
        return new SnowflakeIdWorker(workerId, datacenterId);
    }
}