package com.example.jobtracker.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;
@Entity
@Table(name = "user_profiles")
@Data
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The "Context" for SDG-8 (Tier 2/3 focus)
    private String currentCity;

    // Technical stack for the AI to analyze
    @Column(columnDefinition = "TEXT")
    private String technicalSkills;

    // The Agent's "Source of Truth"
    @Column(columnDefinition = "TEXT")
    private String rawResumeContent;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}