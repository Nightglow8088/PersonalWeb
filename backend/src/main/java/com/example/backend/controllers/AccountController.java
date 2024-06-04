package com.example.backend.controllers;

import com.example.backend.model.Users;
import com.example.backend.response.Response;
import com.example.backend.services.UserAccountService;
import com.example.backend.services.UserMailAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/AccountController")
//@RequestMapping("/api/auth")

public class AccountController {

    private final UserAccountService userService;

//    private final UserMailAccountService userMailAccountService;



    @Autowired
    public AccountController(UserAccountService userService) {
        this.userService = userService;
//        this.userMailAccountService = userMailAccountService;
    }


    @GetMapping("/showAll")
    public ResponseEntity<Response<List<Users>>> getAllUser(){
        List<Users> result = userService.getAllUsers();
        Response<List<Users>> response = Response.ok(result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody Users user) {
//        userService.register(user);
////        return ResponseEntity.ok("Registration successful. Please check your email for verification link.");
//        return new ResponseEntity<>(Response.ok("Registration successful. Please check your email for verification link."), HttpStatus.OK);
//    }
//
//    @GetMapping("/verify")
//    public ResponseEntity<?> verifyUser(@RequestParam String token) {
//        boolean isVerified = userMailAccountService.verifyUser(token);
//        if (isVerified) {
//            return new ResponseEntity<>(Response.ok("Email verified successfully."), HttpStatus.OK);
//        }
//        else {
//            return new ResponseEntity<>(Response.ok("Invalid verification token."),HttpStatus.NOT_ACCEPTABLE);
//        }
//    }

}
