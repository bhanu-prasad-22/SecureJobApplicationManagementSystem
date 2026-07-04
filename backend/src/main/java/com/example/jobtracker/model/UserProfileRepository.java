package com.example.jobtracker.model;

import com.example.jobtracker.model.User;
import com.example.jobtracker.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    // This is the most important method for your Agent.
    // It allows the AI to find the profile belonging to the logged-in user.
    Optional<UserProfile> findByUser(User user);

    // Useful for checking if a profile already exists before creating a new one
    boolean existsByUser(User user);
}