package com.example.backend.config;
import com.example.backend.model.AuthProvider;
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

//    @Override
//    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//        String username = authentication.getName();
//        String password = authentication.getCredentials().toString();
//
//        Users matchedUser = userAccountService.getMatedUser(username, password);
//        if (matchedUser == null) {
//            throw new BadCredentialsException("Invalid username or password");
//        }
//
//        UserDetails userDetails = User.withUsername(matchedUser.getName())
//                .password(matchedUser.getPassword())
//                .roles(matchedUser.getRole())
//                .build();
//
//        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
//    }


    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {
        String mail     = authentication.getName();
        String rawPwd   = authentication.getCredentials().toString();

        // 1) 按邮箱查用户
        Users user = userAccountService.findByMailAddress(mail)
                .orElseThrow(() -> new BadCredentialsException("用户名或密码错误"));

        // 2) 只允许 LOCAL 来源的用户走密码校验
        if (user.getAuthProvider() != AuthProvider.LOCAL) {
            throw new BadCredentialsException(
                    "该邮箱由 " + user.getAuthProvider() +
                            " 登录，请使用对应方式或先设置密码"
            );
        }

        // 3) 用 PasswordEncoder 校验密码
        if (!passwordEncoder.matches(rawPwd, user.getPassword())) {
            throw new BadCredentialsException("用户名或密码错误");
        }

        // 4) 构造 Spring Security UserDetails
        User.UserBuilder builder = User.withUsername(user.getName())
                .password(user.getPassword())
                .roles(user.getRole());
        return new UsernamePasswordAuthenticationToken(
                builder.build(), null, builder.build().getAuthorities()
        );
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}