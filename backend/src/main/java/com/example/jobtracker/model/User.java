package com.example.jobtracker.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String email ;

    @Column(nullable = false)
    private String password ;//This will be Hashed Bcrypt

    @Enumerated(EnumType.STRING)
    private Role role=Role.USER;

    public enum Role
    {
        USER,ADMIN
    }
}
