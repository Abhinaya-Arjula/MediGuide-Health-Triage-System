package com.abhinaya.healthtriage.controller;

import com.abhinaya.healthtriage.dto.RegisterRequest;
import com.abhinaya.healthtriage.entity.User;
import com.abhinaya.healthtriage.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.abhinaya.healthtriage.dto.LoginRequest;
import io.swagger.v3.oas.annotations.Operation;
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }
    @Operation(summary = "Register a new user")
    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest request) {

        User user = userService.registerUser(request);

        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
    @Operation(summary = "Authenticate an existing user")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {

        userService.loginUser(request);

        return ResponseEntity.ok("Login Successful");
    }
}