package com.kelompok3.rental_kendaraan_be.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kelompok3.rental_kendaraan_be.dto.AuthResponseDTO;
import com.kelompok3.rental_kendaraan_be.dto.LoginRequest;
import com.kelompok3.rental_kendaraan_be.dto.RegisterRequest;
import com.kelompok3.rental_kendaraan_be.model.User;
import com.kelompok3.rental_kendaraan_be.repository.UserRepository;
import com.kelompok3.rental_kendaraan_be.security.CustomUserDetailsService;
import com.kelompok3.rental_kendaraan_be.security.JWTGenerator;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTGenerator jwtGenerator;
    
    @Autowired
    private CustomUserDetailsService customUserDetailsService; // Inject CustomUserDetailsService

    public AuthController(
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JWTGenerator jwtGenerator) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Using CustomUserDetailsService to load the user
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginRequest.getUsername());
            
            // Validate password using passwordEncoder
            if (!passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
                throw new BadCredentialsException("Invalid username or password");
            }

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtGenerator.generateToken(authentication);

            User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
                
            AuthResponseDTO response = new AuthResponseDTO(token, "Bearer ", user.getUsername(), user.getRole(), user.getId());
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponseDTO("Invalid username or password"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setEmail(registerRequest.getEmail());
        user.setNamaLengkap(registerRequest.getNamaLengkap());
        user.setNoTelepon(registerRequest.getNoTelepon());
        user.setRole(registerRequest.getRole()); // Set default role

        userRepository.save(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }
}

