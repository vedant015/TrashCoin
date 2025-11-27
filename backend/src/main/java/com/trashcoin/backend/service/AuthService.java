package com.trashcoin.backend.service;

import com.trashcoin.backend.dto.AuthResponse;
import com.trashcoin.backend.dto.LoginRequest;
import com.trashcoin.backend.dto.SignupRequest;
import com.trashcoin.backend.model.User;
import com.trashcoin.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    public AuthResponse signup(SignupRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(null, null, null, null, "Email already registered");
        }
        
        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In production, hash the password
        user.setName(request.getName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setAddress(request.getAddress());
        user.setCoinsEarned(0);
        
        user = userRepository.save(user);
        
        return new AuthResponse(
            user.getId(),
            user.getEmail(),
            user.getName(),
            user.getCoinsEarned(),
            "Signup successful"
        );
    }
    
    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        
        if (userOpt.isEmpty()) {
            return new AuthResponse(null, null, null, null, "User not found");
        }
        
        User user = userOpt.get();
        
        // In production, use proper password hashing comparison
        if (!user.getPassword().equals(request.getPassword())) {
            return new AuthResponse(null, null, null, null, "Invalid password");
        }
        
        return new AuthResponse(
            user.getId(),
            user.getEmail(),
            user.getName(),
            user.getCoinsEarned(),
            "Login successful"
        );
    }
    
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
}
