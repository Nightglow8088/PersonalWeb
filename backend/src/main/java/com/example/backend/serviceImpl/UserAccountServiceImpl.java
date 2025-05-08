package com.example.backend.serviceImpl;

import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.model.AuthDTO;
import com.example.backend.model.AuthProvider;
import com.example.backend.model.UserMailAccount;
import com.example.backend.model.Users;
import com.example.backend.repositories.UserAccountRepository;
import com.example.backend.services.UserAccountService;
import com.example.backend.services.UserMailAccountService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserAccountServiceImpl implements UserAccountService {

    private final UserAccountRepository userRepository;

    private final UserMailAccountService userMailAccountService;

    private final PasswordEncoder passwordEncoder;    // 注入

    @Value("${app.base-url}")
    private String baseUrl;


    @Autowired
    public UserAccountServiceImpl(UserAccountRepository userRepository, UserMailAccountService userMailAccountService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMailAccountService = userMailAccountService;
        this.passwordEncoder = passwordEncoder;

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
    public Optional<Users> findByMailAddress(String mailAddress) {
        return userRepository.findByMailAddress(mailAddress);
    }


    @Override
    public Users getMatedUser(String name, String password) {
        return userRepository.findMatchedUser(name,password);
    }

    //必须尽快改掉
//    @Override
//    public UserDetails loadUserByUsername(String name){
//        List<Users> users = getAllUsers();
//        for (Users user : users) {
//            if (user.getName().equals(name) ) {
//                return new org.springframework.security.core.userdetails.User(user.getName(), user.getPassword(), new ArrayList<>());
//            }
//        }
////        return null;
//
//
////        User user = userRepository.findByUsername(username);
////        if (user == null) {
//            throw new UsernameNotFoundException("User not found with username: " + name);
////        }
////        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
//    }

    /**
     * Spring Security 调用：校验 JWT 或表单登录时，
     * 传进来的是 username = mailAddress
     */
    @Override
    public UserDetails loadUserByUsername(String mailAddress)
            throws UsernameNotFoundException {
        // 1) 按邮箱查用户
        Users user = userRepository.findByMailAddress(mailAddress)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with email: " + mailAddress
                        )
                );

        // 2) 构造 Spring Security 的 UserDetails
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getMailAddress())    // 一定要用 mailAddress
                .password(user.getPassword())
                .roles(user.getRole())                  // 或 authorities(...)
                .build();
    }



    @Override
    @Transactional
    public void register(Users user){
        //按照gpt的想法 走这个api的只有密码
        user.setAuthProvider(AuthProvider.LOCAL);
        //这里貌似还应该给pwd加密下 但我没干

        String email = user.getMailAddress();

        // —— 查 basic_account 表 ——
        if (userRepository.findByMailAddress(email).isPresent()) {
            throw new EmailAlreadyExistsException(email);
        }

        UserMailAccount userMailAccount = new UserMailAccount();
        userMailAccount.setMailAccount(user.getMailAddress());
        userMailAccount.setEnabled(false);
        userMailAccount.setVerificationToken(UUID.randomUUID().toString());
        userMailAccountService.save(userMailAccount);

        // 2) 加密密码 并设置来源
        user.setAuthProvider(AuthProvider.LOCAL);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("user");
        userRepository.save(user);


//        String verificationLink = "http://localhost:8080/api/auth/verify?token=" + userMailAccount.getVerificationToken();
//        userMailAccountService.sendEmail(userMailAccount.getMailAccount(), "Email Verification", "Please click the link to verify your email: " + verificationLink);

        String token = userMailAccount.getVerificationToken();
        String verificationLink = baseUrl + "/api/auth/verify?token=" + token;
        userMailAccountService.sendEmail(
                user.getMailAddress(),
                "请验证邮箱",
                "点击此链接激活账号： " + verificationLink
        );
    }

    @Override
    public Users login(AuthDTO authDTO) {
        //如果是空的呢
//        return userRepository.mailPwdMatcher(authDTO.getMailAddress(), authDTO.getPassword());
        // 不直接比对密码了，改为：
        Users user = userRepository.findByMailAddress(authDTO.getMailAddress())
                .orElse(null);

        if (user == null
                || user.getAuthProvider() != AuthProvider.LOCAL
                || !passwordEncoder.matches(authDTO.getPassword(), user.getPassword())
                || !userMailAccountService.isEnabled(authDTO.getMailAddress())
        ) {
            return null;  // 或者抛 BadCredentialsException
        }
        return user;
    }


    @Override
    public Users registerOAuthUser(String mailAddress) {
        // 1) 在 user_mail_account 表插一行
        UserMailAccount mail = new UserMailAccount();
        mail.setMailAccount(mailAddress);
        mail.setEnabled(true);
        mail.setVerificationToken(null);
        userMailAccountService.save(mail);


        // 可以根据业务定制默认用户名、角色等
        Users user = new Users();
        user.setMailAddress(mailAddress);
        user.setName(mailAddress);            // 暂以邮箱当用户名
        user.setPassword("");                 // OAuth 用户无需本地密码
        user.setRole("user");            // 默认角色
        //目前接接受谷歌 写死好了
        user.setAuthProvider(AuthProvider.GOOGLE);

        return userRepository.save(user);
    }

}
