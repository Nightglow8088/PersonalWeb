package com.example.backend.services;

import com.example.backend.model.AuthDTO;
import com.example.backend.model.Users;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserAccountService {
    List<Users> getAllUsers();

    Users saveUser(Users user);

    Users getMatedUser(String name, String password);

    UserDetails loadUserByUsername(String name);

    void register(Users user);

    Users login(AuthDTO authDTO);




}
