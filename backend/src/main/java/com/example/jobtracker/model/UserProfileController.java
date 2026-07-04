package com.example.jobtracker.model;

import com.example.jobtracker.model.dto.ProfileRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
@CrossOrigin(origins = "http://localhost:5173") // Your Vite port
public class UserProfileController {

    @Autowired
    private UserProfileService profileService;

    @PostMapping
    public ResponseEntity<UserProfile> saveProfile(@RequestBody ProfileRequest request) {
        // This is the 'Agent Trigger'
        UserProfile savedProfile = profileService.initializeAgentProfile(request);
        return ResponseEntity.ok(savedProfile);
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfile> getMyProfile() {
        return ResponseEntity.ok(profileService.getCurrentUserProfile());
    }
}