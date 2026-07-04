package com.example.jobtracker.model;

import com.example.jobtracker.model.dto.AuthRequest;
import com.example.jobtracker.model.exception.ResourceNotFoundException;
import com.example.jobtracker.model.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(AuthRequest request)
    {
        //check if email already exists
        if(userRepository.findByEmail(request.getEmail()).isPresent())
        {
            throw new RuntimeException("Email already taken!");
        }

        //create new User entity
        User user =new User();
        user.setEmail(request.getEmail());

        //Hash the password before saving
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return "user Registered successfully!";
    }

    private final JwtService jwtService;

    public String login(AuthRequest request)
    {
        //find user
        User user =userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid Credentials"));
        //check password
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword()))
        {
            throw new ResourceNotFoundException("Invalid Credentials");
        }

        //return the token
        return jwtService.generateToken(user.getEmail());
    }
}
