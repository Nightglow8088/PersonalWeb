package com.example.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig  {
    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final JwtRequestFilter jwtRequestFilter;
    private final AuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final AccessDeniedHandler customAccessDeniedHandler;

    private final OAuth2LoginSuccessHandler oauth2LoginSuccessHandler;


    @Autowired
    public SecurityConfig(CustomAuthenticationProvider customAuthenticationProvider, JwtRequestFilter jwtRequestFilter,
                          AuthenticationEntryPoint jwtAuthenticationEntryPoint, AccessDeniedHandler customAccessDeniedHandler,
                             OAuth2LoginSuccessHandler oauth2LoginSuccessHandler) {
        this.customAuthenticationProvider = customAuthenticationProvider;
        this.jwtRequestFilter = jwtRequestFilter;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.customAccessDeniedHandler = customAccessDeniedHandler;
        this.oauth2LoginSuccessHandler=oauth2LoginSuccessHandler;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 关闭 CSRF、Session，因为我们用 JWT
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // 异常处理：认证失败、权限不足
            .exceptionHandling(ex -> ex
                    .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                    .accessDeniedHandler(customAccessDeniedHandler)
            )

                // 3) Lambda‑style CORS configuration
                .cors(cors -> cors
                        .configurationSource(corsConfigurationSource())
                )

            // 路径权限配置
            .authorizeHttpRequests(auth -> auth
                    // 以下端点都放行
                    .requestMatchers("/actuator/health", "/api/actuator/health").permitAll()

                    .requestMatchers(
                            "/", "/home",
                            // —— 放行前端会访问的 Controller ——
                            // 旧的无前缀端点，如果你还保留测试用可以同时放
//                            "/BlogController/**",
//                            "/ImagesController/**",

                            // 新增：带 /api 前缀后的真正生产路径
                            "/api/BlogController/**",
                            "/api/ImagesController/**",

                            "/api/auth/login", "/api/auth/register", "/api/auth/verify",
                            "/oauth2/**", "/login/oauth2/**"
                    ).permitAll()
                    // 其余接口都需要认证
                    .anyRequest().authenticated()
            )

            // 用户名/密码登录禁用 Spring 默认表单
            .formLogin(AbstractHttpConfigurer::disable)
            .logout(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)

            // 启用 OAuth2 登录，成功后交给自定义 Handler
            .oauth2Login(oauth2 -> oauth2
                    .successHandler(oauth2LoginSuccessHandler)
            )

            // 在 UsernamePasswordAuthenticationFilter 之前插入 JWT 过滤器
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        // 允许 H2 控制台
        http.headers(h -> h.frameOptions(f -> f.sameOrigin()));

        return http.build();
    }



    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(customAuthenticationProvider);
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.authenticationProvider(customAuthenticationProvider);
        return authenticationManagerBuilder.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        // adjust these origins to match your frontend
        cfg.setAllowedOrigins(List.of("https://kevinb.website",
                                        "https://www.kevinb.website",
                                        "http://localhost:3000"
        ));
        cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        cfg.setAllowedHeaders(List.of("*"));
        cfg.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }

//    @Bean
//    public AccessDeniedHandler accessDeniedHandler() {
//        return (request, response, accessDeniedException) -> {
//            // 这里也可以自定义响应内容
//            response.sendError(HttpStatus.FORBIDDEN.value(), "Access Denied: You do not have the necessary permissions to access this resource.");
//        };
//    }

}


//    @Bean
//    public UserDetailsService userDetailsService() {
//        return username -> {
//            User user = userAccountService.getMatedUser(username, password);
//
//            if (user == null) {
//                throw new UsernameNotFoundException("User not found");
//            }
//            return org.springframework.security.core.userdetails.User
//                    .withUsername(user.getName())
//                    .password(user.getPassword())
//                    .roles(user.getRole())
//                    .build();
//        };
//    }

//该类WebSecurityConfig带有注释，@EnableWebSecurity以启用 Spring Security 的 Web 安全支持并提供 Spring MVC 集成。它还公开了两个 bean 来设置 Web 安全配置的一些细节：
//
//        该SecurityFilterChainbean 定义哪些 URL 路径应受保护，哪些不应受保护。具体来说，/和/home路径配置为不需要任何身份验证。所有其他路径都必须经过身份验证。
//
//        当用户成功登录时，他们会被重定向到之前请求的需要身份验证的页面。有一个自定义/login页面（由 指定loginPage()），并且每个人都可以查看它。
//
//        该UserDetailsServicebean 设置了一个内存用户存储，其中包含单个用户。该用户的用户名为user，密码为password，角色为USER。
//
//        现在您需要创建登录页面。该视图已经有一个视图控制器login，因此您只需要创建登录视图本身，如以下清单（来自src/main/resources/templates/login.html）所示：
