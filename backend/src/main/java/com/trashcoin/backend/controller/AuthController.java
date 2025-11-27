package com.trashcoin.backend.controller;

import com.trashcoin.backend.dto.AuthResponse;
import com.trashcoin.backend.dto.LoginRequest;
import com.trashcoin.backend.dto.SignupRequest;
import com.trashcoin.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000"})
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
        AuthResponse response = authService.signup(request);
        
        if (response.getUserId() == null) {
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        
        if (response.getUserId() == null) {
            return ResponseEntity.badRequest().body(response);
        }
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<AuthResponse> getUserDetails(@PathVariable Long userId) {
        var user = authService.getUserById(userId);
        
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        
        AuthResponse response = new AuthResponse(
            user.getId(),
            user.getEmail(),
            user.getName(),
            user.getCoinsEarned(),
            "User details retrieved"
        );
        
        return ResponseEntity.ok(response);
    }
}
