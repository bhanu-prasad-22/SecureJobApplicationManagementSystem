package com.example.jobtracker.model;

import com.example.jobtracker.model.dto.ProfileRequest;
import com.example.jobtracker.model.security.SecurityUtils; // Import the util
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository profileRepository;

    // FIX: Add this method for the Controller
    public UserProfile getCurrentUserProfile() {
        User currentUser = SecurityUtils.getCurrentUser(); // This must be unique per login
        return profileRepository.findByUser(currentUser)
                .orElseThrow(() -> new RuntimeException("No profile found for this user"));
    }

    public UserProfile initializeAgentProfile(ProfileRequest request) {
        User currentUser = SecurityUtils.getCurrentUser();

        UserProfile profile = profileRepository.findByUser(currentUser)
                .orElse(new UserProfile());

        profile.setUser(currentUser);
        profile.setTechnicalSkills(request.getSkills());
        profile.setCurrentCity(request.getLocation());

        return profileRepository.save(profile);
    }
}