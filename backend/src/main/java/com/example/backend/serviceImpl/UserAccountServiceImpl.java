package com.example.backend.serviceImpl;

import com.example.backend.model.UserMailAccount;
import com.example.backend.model.Users;
import com.example.backend.repositories.UserAccountRepository;
import com.example.backend.services.UserAccountService;
import com.example.backend.services.UserMailAccountService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserAccountServiceImpl implements UserAccountService {

    private final UserAccountRepository userRepository;

    private final UserMailAccountService userMailAccountService;


    @Autowired
    public UserAccountServiceImpl(UserAccountRepository userRepository, UserMailAccountService userMailAccountService) {
        this.userRepository = userRepository;
        this.userMailAccountService = userMailAccountService;
    }

    @Override
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Users saveUser(Users user){
        return userRepository.save(user);
    }


    @Override
    public Users getMatedUser(String name, String password) {
        return userRepository.findMatchedUser(name,password);
    }

    //必须尽快改掉
    @Override
    public UserDetails loadUserByUsername(String name){
        List<Users> users = getAllUsers();
        for (Users user : users) {
            if (user.getName().equals(name) ) {
                return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(), new ArrayList<>());
            }
        }
//        return null;


//        User user = userRepository.findByUsername(username);
//        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + name);
//        }
//        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }

    @Override
    @Transactional
    public void register(Users user){
        UserMailAccount userMailAccount = new UserMailAccount();
        userMailAccount.setMailAccount(user.getMailAddress());
        userMailAccount.setEnabled(false);
        userMailAccount.setVerificationToken(UUID.randomUUID().toString());
        userRepository.save(user);

        String verificationLink = "http://localhost:8080/api/auth/verify?token=" + userMailAccount.getVerificationToken();
        userMailAccountService.sendEmail(userMailAccount.getMailAccount(), "Email Verification", "Please click the link to verify your email: " + verificationLink);

    }
}
