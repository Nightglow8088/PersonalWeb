package com.example.backend.util;


import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.*;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.http.javanet.NetHttpTransport;

import java.io.InputStreamReader;
import java.util.List;

public class GmailOAuth2Util {
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";
    private static final List<String> SCOPES =
            List.of("https://www.googleapis.com/auth/gmail.send");

    public static void main(String[] args) throws Exception {
        // 1) 加载 client_id、client_secret
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(
                JacksonFactory.getDefaultInstance(),
                new InputStreamReader(
                        GmailOAuth2Util.class.getResourceAsStream(CREDENTIALS_FILE_PATH)
                )
        );

        // 2) 构造授权流程
        GoogleAuthorizationCodeFlow flow =
                new GoogleAuthorizationCodeFlow.Builder(
                        new NetHttpTransport(),
                        JacksonFactory.getDefaultInstance(),
                        clientSecrets,
                        SCOPES
                )
                        .setAccessType("offline")   // 离线模式，能拿到 refresh token
                        .build();

        // 3) 本地启动一个 HTTP 监听，自动接收授权回调
        LocalServerReceiver receiver =
                new LocalServerReceiver.Builder().setPort(8888).build();

        // 4) 弹浏览器，第一次授权后控制台打印 Tokens
        Credential credential = new AuthorizationCodeInstalledApp(flow, receiver)
                .authorize("user");

        System.out.println("Access Token:  " + credential.getAccessToken());
        System.out.println("Refresh Token: " + credential.getRefreshToken());
    }
}
