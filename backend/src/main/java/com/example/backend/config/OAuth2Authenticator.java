package com.example.backend.config;

import java.security.Security;

public class OAuth2Authenticator {
    /** 请在调用任何 Mail 代码前先执行此方法，启用 XOAUTH2 */
    public static void initialize() {
        // 告诉 Jakarta Mail 使用 XOAUTH2 机制
        Security.setProperty("mail.smtp.auth.mechanisms", "XOAUTH2");
    }
}