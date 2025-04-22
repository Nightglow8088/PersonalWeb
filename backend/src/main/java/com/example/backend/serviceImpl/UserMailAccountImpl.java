package com.example.backend.serviceImpl;

import com.example.backend.model.UserMailAccount;
import com.example.backend.repositories.UserMailAccountRepository;

import com.example.backend.services.MailService;
import com.example.backend.services.UserMailAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class UserMailAccountImpl implements UserMailAccountService {

    @Autowired
    private UserMailAccountRepository userMailAccountRepository;


    private final MailService mailService;
    @Autowired
    public UserMailAccountImpl(MailService mailService){
        this.mailService= mailService;
    }




    @Override
    public void sendEmail(String to, String subject, String text) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject(subject);
//        message.setText(text);
//        message.setFrom("mn961132@outlook.com");  // 设置发件人、
        try {
            mailService.sendEmail(to, subject, text);
        } catch (Exception e) {
            // 根据你的全局异常策略抛出或记录
            throw new RuntimeException("发送邮件失败", e);
        }

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

    @Override
    public boolean isEnabled(String mailAccount) {
        // 查不到或 enabled=false 都返回 false
        UserMailAccount account = userMailAccountRepository
                .findByMailAccount(mailAccount)
                .orElse(null);
        return account != null && account.isEnabled();
    }

}
