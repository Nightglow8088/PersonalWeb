package com.example.backend.config;

import com.example.backend.exception.InvalidJwtAuthenticationException;
import com.example.backend.services.UserAccountService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;



@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    private final UserAccountService userAccountService;

    @Autowired
    public JwtRequestFilter(JwtUtils jwtUtils,UserAccountService userAccountService ){
        this.jwtUtils =  jwtUtils;
        this.userAccountService= userAccountService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                jwt = authorizationHeader.substring(7);
                username = jwtUtils.extractUsername(jwt);
            } catch (Exception e) {
                throw new InvalidJwtAuthenticationException("JWT token is expired or invalid");
            }
        }
        else if (authorizationHeader == null || authorizationHeader.isEmpty()) {
            // 如果请求路径是公共端点，则跳过 JWT 验证
            if (isPublicEndpoint(request.getRequestURI())) {
                chain.doFilter(request, response);
                return;
            } else {
                // 如果请求路径不是公共端点，且没有 Authorization 头，则抛出自定义异常
                throw new InvalidJwtAuthenticationException("Authorization header is missing or empty");
            }
        }


        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userAccountService.loadUserByUsername(username);
            if (jwtUtils.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
            else {
                throw new InvalidJwtAuthenticationException("JWT token is expired or invalid");
            }
        }
        chain.doFilter(request, response);
    }

    //这个绝对要改的 当没有header头的时候执行这段操作
    private boolean isPublicEndpoint(String uri) {

        return uri.startsWith("/api/auth/")      // 登录、注册、验证
                || uri.startsWith("/api/BlogController/")   // 文章列表、详情等
                || uri.startsWith("/api/ImagesController/") // 图片服务
                || uri.startsWith("/api/actuator/")   // 健康检查
                || uri.equals("/")                    // 首页
                || uri.equals("/home")
                || uri.startsWith("/oauth2/")         // OAuth2 授权
                || uri.startsWith("/login/oauth2/")   // OAuth2 回调
                || uri.startsWith("/h2-console/")   // H2 控制台（如果还在用）
                || uri.equals("/api/comments/getComments");

        // 定义公共端点
//        return uri.equals("/api/auth/login") || uri.equals("/api/auth/register") || uri.equals("/api/auth/verify") || uri.equals("/api/auth/refresh") || uri.startsWith("/h2-console");
    }

}



