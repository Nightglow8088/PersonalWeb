package com.example.backend.config;

import com.example.backend.model.Users;
import com.example.backend.services.UserAccountService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Collections;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Value("${app.frontend-base-url}")
    private String frontendBaseUrl;
    private final JwtUtils jwtUtils;

    private final UserAccountService userService;

    @Autowired
    public OAuth2LoginSuccessHandler(JwtUtils jwtUtils, UserAccountService userService) {
        this.jwtUtils = jwtUtils;
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest req,
            HttpServletResponse res,
            Authentication authentication
    ) throws IOException {
        // 从 OAuth2 token 里拿 email
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
        String email = oauthToken.getPrincipal().getAttribute("email");

        // 查库或自动注册
        Users user = userService
                .findByMailAddress(email)
                .orElseGet(() -> userService.registerOAuthUser(email));

        SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(user.getRole());


        // 构造 Spring Authentication，用于签 JWT
        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(
                        user.getMailAddress(),
                        null,
                        Collections.singletonList(authority)
                );

        // 生成 JWT
        String jwt = jwtUtils.generateJwtToken(authToken);

//        // 返回给前端
//        res.setContentType("application/json");
//        res.getWriter().write("{\"token\":\"" + jwt + "\"}");
        String redirectUri = UriComponentsBuilder
                .fromHttpUrl(frontendBaseUrl)
                .path("/oauth2/redirect")
                .queryParam("token", jwt)
                .build()
                .toUriString();

        res.sendRedirect(redirectUri);
    }
}
