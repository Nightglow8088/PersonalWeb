package com.example.backend.controllers;

import com.example.backend.config.JwtUtils;
import com.example.backend.model.AuthDTO;
import com.example.backend.model.Users;
import com.example.backend.response.Response;
import com.example.backend.services.UserAccountService;
import com.example.backend.services.UserMailAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping("/login")
    public ResponseEntity<Response<?>> login(@RequestBody AuthDTO authRequest) {
        try {
            Users user = userService.login(authRequest);
            if(user==null){
                Response<String> response = Response.error("user not found or have not verified by mail");
                return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
            }

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getMailAddress(), authRequest.getPassword()));
            String jwt = jwtUtils.generateJwtToken(authentication);
            Response<String> response = Response.ok(jwt);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (AuthenticationException e) {
//            Response<String> response = Response.error("Invalid username or password", e.getMessage());
            Response<String> response = Response.error( e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);

        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        userService.register(user);
//        return ResponseEntity.ok("Registration successful. Please check your email for verification link.");
        return new ResponseEntity<>(Response.ok("Registration successful. Please check your email for verification link."), HttpStatus.OK);
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
    public ResponseEntity<?> refresh(@RequestBody String token) {
        try {
            String refreshedToken = jwtUtils.refreshJwtToken(token);
            Response<String> response = Response.ok(refreshedToken);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }
}
