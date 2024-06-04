package com.example.backend.services;

import com.example.backend.model.UserMailAccount;
import org.springframework.stereotype.Service;

public interface UserMailAccountService {
    public void sendEmail(String to, String subject, String text);

    public boolean verifyUser(String token);

    public void save(UserMailAccount userMailAccount);


}
