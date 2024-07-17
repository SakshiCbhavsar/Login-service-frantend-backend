package com.cdl.login.LoginService.controller;

import com.cdl.login.LoginService.config.JWTAuthResponse;
import com.cdl.login.LoginService.dto.LoginDto;
import com.cdl.login.LoginService.model.User;
import com.cdl.login.LoginService.service.AuthService;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpClient;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private AuthService authService;

    // Build Login REST API
    @PostMapping("/login")
    public ResponseEntity<JWTAuthResponse> authenticate(@RequestBody LoginDto loginDto){
        String token = authService.login(loginDto);

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }
    @PostMapping("/register")
    public User register(@RequestBody User user){
        return authService.createUser(user);
    }

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return authService.getAllUsers();
    }
}