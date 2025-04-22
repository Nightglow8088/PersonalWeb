package com.example.backend.model;

public enum AuthProvider {
    LOCAL,       // 本地邮箱/密码注册
    GOOGLE,      // Google OAuth 注册
    // 以后还可以加 FACEBOOK, GITHUB…
}