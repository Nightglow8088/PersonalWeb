package com.example.backend.services;

import com.example.backend.model.AuthDTO;
import com.example.backend.model.Users;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UserAccountService {
    List<Users> getAllUsers();

    Users saveUser(Users user);

    Optional<Users> findByMailAddress(String mailAddress);

    Users getMatedUser(String name, String password);

    UserDetails loadUserByUsername(String name);

    void register(Users user);

    Users login(AuthDTO authDTO);


    /**
     * OAuth 首次登陆时自动注册用户
     * @param mailAddress 用户邮箱
     * @return 新创建并持久化的 Users
     */
    Users registerOAuthUser(String mailAddress);




}
