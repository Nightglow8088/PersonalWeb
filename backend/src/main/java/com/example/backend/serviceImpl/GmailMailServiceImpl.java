package com.example.backend.serviceImpl;

import com.example.backend.config.OAuth2Authenticator;
import com.example.backend.services.MailService;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.services.gmail.Gmail;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.UserCredentials;
import jakarta.mail.Session;
import com.google.api.services.gmail.model.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.Properties;

@Service
public class GmailMailServiceImpl implements MailService {

    @Value("${gmail.client-id}")
    private String clientId;
    @Value("${gmail.client-secret}")
    private String clientSecret;
    @Value("${gmail.refresh-token}")
    private String refreshToken;
    @Value("${gmail.user-email}")
    private String userEmail;

    @Override
    public void sendEmail(String to, String subject, String body) throws Exception {
        // 1) 构造含 refresh-token 的 UserCredentials
        UserCredentials userCred = UserCredentials.newBuilder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .setRefreshToken(refreshToken)
                .build();

        // 2) 扩展成 GoogleCredentials 并附带 gmail.send 权限
        GoogleCredentials googleCred = userCred.createScoped(
                List.of("https://www.googleapis.com/auth/gmail.send")
        );

        // 3) 用 HttpCredentialsAdapter 适配到 HTTP 客户端
        HttpCredentialsAdapter adapter = new HttpCredentialsAdapter(googleCred);

        // 4) 构造 Gmail 客户端
        Gmail service = new Gmail.Builder(
                new NetHttpTransport(),
                JacksonFactory.getDefaultInstance(),
                adapter
        )
                .setApplicationName("MyApp")
                .build();

        // 5) 用 JavaMail 构造 MimeMessage
        Properties props = new Properties();
        Session session = Session.getInstance(props);
        MimeMessage mimeMsg = new MimeMessage(session);
        mimeMsg.setFrom(new InternetAddress(userEmail));
        mimeMsg.addRecipient(MimeMessage.RecipientType.TO, new InternetAddress(to));
        mimeMsg.setSubject(subject);
        mimeMsg.setText(body);

        // 6) 转成 Gmail API 的 Message
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        mimeMsg.writeTo(buffer);
        String encodedEmail = Base64.encodeBase64URLSafeString(buffer.toByteArray());
        Message gmailMessage = new Message();
        gmailMessage.setRaw(encodedEmail);

        // 7) 调用 Gmail API 发送
        service.users().messages().send("me", gmailMessage).execute();
    }}