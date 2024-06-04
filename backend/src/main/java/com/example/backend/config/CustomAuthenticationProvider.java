package com.example.backend.config;
import org.springframework.security.core.userdetails.User;

import com.example.backend.model.Users;
import com.example.backend.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {


    private final UserAccountService userAccountService;


    private PasswordEncoder passwordEncoder;

    @Autowired
    public CustomAuthenticationProvider(UserAccountService userAccountService, PasswordEncoder passwordEncoder) {
        this.userAccountService = userAccountService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        Users matchedUser = userAccountService.getMatedUser(username, password);
        if (matchedUser == null) {
            throw new BadCredentialsException("Invalid username or password");
        }

        UserDetails userDetails = User.withUsername(matchedUser.getName())
                .password(matchedUser.getPassword())
                .roles(matchedUser.getRole())
                .build();

        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}