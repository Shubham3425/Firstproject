package com.fixit.service;

import com.fixit.dto.*;
import com.fixit.entity.User;
import com.fixit.repository.UserRepository;
import com.fixit.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail()))
            throw new RuntimeException("Email already registered");

        User user = User.builder()
                .name(req.getName()).email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .phone(req.getPhone()).city(req.getCity())
                .role(req.getRole() != null ? req.getRole() : User.Role.CUSTOMER)
                .build();
        userRepository.save(user);

        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        String token = jwtUtils.generateToken(auth);

        return AuthResponse.builder().token(token).type("Bearer")
                .userId(user.getId()).name(user.getName())
                .email(user.getEmail()).role(user.getRole().name()).build();
    }

    public AuthResponse login(AuthRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        String token = jwtUtils.generateToken(auth);
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return AuthResponse.builder().token(token).type("Bearer")
                .userId(user.getId()).name(user.getName())
                .email(user.getEmail()).role(user.getRole().name()).build();
    }
}
