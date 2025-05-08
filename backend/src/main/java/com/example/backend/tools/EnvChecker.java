//package com.example.backend.tools;
//
//import jakarta.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//@Component
//这个就是检测环境注入的 不用管了现在
//public class EnvChecker {
//    @Value("${spring.security.oauth2.client.registration.google.client-id}")
//    private String clientId;
//    @PostConstruct
//    public void dump() {
//        System.out.println("Google Client ID = " + clientId);
//    }
//}
