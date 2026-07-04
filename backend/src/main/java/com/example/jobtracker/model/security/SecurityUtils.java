package com.example.jobtracker.model.security;

import com.example.jobtracker.model.User;
import com.example.jobtracker.model.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class SecurityUtils {

    private static UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository repo) {
        SecurityUtils.userRepository = repo;
    }

    public static User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // If your filter stores the Email as a string:
        if (principal instanceof String) {
            return userRepository.findByEmail((String) principal)
                    .orElseThrow(() -> new RuntimeException("User not found in context"));
        }
        return null;
    }
}