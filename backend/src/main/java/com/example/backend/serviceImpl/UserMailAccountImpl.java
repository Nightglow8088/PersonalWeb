package com.example.backend.serviceImpl;

import com.example.backend.model.UserMailAccount;
import com.example.backend.repositories.UserMailAccountRepository;
import com.example.backend.services.UserMailAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class UserMailAccountImpl implements UserMailAccountService {

    @Autowired
    private UserMailAccountRepository userMailAccountRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom("Personal Web");  // 设置发件人
        mailSender.send(message);
    }

    @Override
    public boolean verifyUser(String token) {
        UserMailAccount userMailAccount = userMailAccountRepository.findByVerificationToken(token);
        if (userMailAccount != null) {
            userMailAccount.setEnabled(true); // 验证通过后启用用户账户
            userMailAccount.setVerificationToken(null);
            userMailAccountRepository.save(userMailAccount);
            return true;
        }
        return false;
    }

    @Override
    public void save(UserMailAccount userMailAccount){
        userMailAccountRepository.save(userMailAccount);
    }

}
