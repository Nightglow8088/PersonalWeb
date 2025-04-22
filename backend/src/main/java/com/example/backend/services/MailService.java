// src/main/java/com/example/backend/services/MailService.java
package com.example.backend.services;

/**
 * 通用邮件发送接口
 */
public interface MailService {
    /**
     * 发送邮件
     * @param to      收件人地址
     * @param subject 邮件主题
     * @param body    邮件正文
     */
    void sendEmail(String to, String subject, String body) throws Exception;
}
