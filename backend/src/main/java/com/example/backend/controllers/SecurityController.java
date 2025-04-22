package com.example.backend.controllers;

import com.example.backend.config.JwtUtils;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.model.AuthDTO;
import com.example.backend.model.AuthProvider;
import com.example.backend.model.Users;
import com.example.backend.response.Response;
import com.example.backend.services.UserAccountService;
import com.example.backend.services.UserMailAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class SecurityController {

    private final UserAccountService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private final UserMailAccountService userMailAccountService;

    private final JwtUtils jwtUtils;


    @Autowired
    public SecurityController(UserAccountService userService,JwtUtils jwtUtils, UserMailAccountService userMailAccountService) {
        this.userService = userService;
        this.jwtUtils =  jwtUtils;
        this.userMailAccountService = userMailAccountService;
    }


//    @PostMapping("/login")
//    public ResponseEntity<Response<?>> login(@RequestBody AuthDTO authRequest) {
//        try {
//            Users user = userService.login(authRequest);
//            if(user==null){
//                Response<String> response = Response.error("user not found or have not verified by mail");
//                return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
//            }
//
//            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getMailAddress(), authRequest.getPassword()));
//            String jwt = jwtUtils.generateJwtToken(authentication);
//            Response<String> response = Response.ok(jwt);
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        } catch (AuthenticationException e) {
////            Response<String> response = Response.error("Invalid username or password", e.getMessage());
//            Response<String> response = Response.error( e.getMessage());
//            return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
//
//        }
//    }

    // 登录
    @PostMapping("/login")

    public ResponseEntity<Response<String>> login( @RequestBody AuthDTO req) {
//        try {
//            // 先 authenticate（如果账号未启用会在 Provider 内抛出异常）
//            Authentication auth = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(req.getMailAddress(), req.getPassword())
//            );
//            String jwt = jwtUtils.generateJwtToken(auth);
//            return ResponseEntity.ok(Response.ok(jwt));
//        } catch (DisabledException e) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN)
//                    .body(Response.error("账号未激活，请检查邮箱"));
//        } catch (BadCredentialsException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(Response.error("用户名或密码错误"));
//        }

        // —— 先查 Optional，不抛异常 ——
        Optional<Users> maybeUser = userService.findByMailAddress(req.getMailAddress());
        if (maybeUser.isEmpty()) {
            // 404 或 400 均可，根据语义我这里用 404
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Response.error("用户不存在"));
        }
        Users user = maybeUser.get();

        // —— 再判断登录类型 ——
        if (user.getAuthProvider() != AuthProvider.LOCAL) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Response.error("该账户仅支持 " + user.getAuthProvider() + " 登录"));
        }

        // —— 密码校验 ——
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getMailAddress(), req.getPassword())
            );
            String jwt = jwtUtils.generateJwtToken(auth);
            return ResponseEntity.ok(Response.ok(jwt));
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Response.error("(用户名或)密码错误"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {

//        userService.register(user);
////        return ResponseEntity.ok("Registration successful. Please check your email for verification link.");
//        return new ResponseEntity<>(Response.ok("Registration successful. Please check your email for verification link."), HttpStatus.OK);
        try {
            userService.register(user);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(Response.ok("注册成功，请前往邮箱验证"));
        } catch (EmailAlreadyExistsException ex) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Response.error(ex.getMessage()));
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam String token) {
        boolean isVerified = userMailAccountService.verifyUser(token);
        if (isVerified) {
            return new ResponseEntity<>(Response.ok("Email verified successfully."), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(Response.error("Invalid verification token."),HttpStatus.NOT_ACCEPTABLE);
        }
    }


    @PostMapping("/refresh")
    public ResponseEntity<Response<String>> refresh(@RequestBody Map<String,String> body){
        String token = body.get("token");
        try {
            String newToken = jwtUtils.refreshJwtToken(token);
            return ResponseEntity.ok(Response.ok(newToken));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Response.error("Invalid or expired token"));
        }
    }

    //之前的额refresh版本
//    @PostMapping("/refresh")
//    public ResponseEntity<?> refresh(@RequestBody String token) {
//        try {
//            String refreshedToken = jwtUtils.refreshJwtToken(token);
//            return new ResponseEntity<>(Response.ok(refreshedToken), HttpStatus.OK);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
//        }
//    }

}
