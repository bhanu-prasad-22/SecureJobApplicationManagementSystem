package com.example.jobtracker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity//tells JPA to create a table in Postgres
@Table(name = "applications")//Tells Postgres: Don't name the table 'JobApplication', name it 'applications'.
@Data//lombok:automatic generation of getters and setters and toString
public class JobApplication {

    @Id//primary key unique for each
    @GeneratedValue(strategy = GenerationType.UUID)//Tells Spring: "Don't ask the user for an ID. Every time a new job is saved, generate a random ID automatically."
    private UUID id;
    //UUID:Universally Unique Identifier, A 128-bit long string.Hash that is globally unique.

    @NotBlank(message="company name is required")//if user does not enter data it shows the error message
    private String companyName;

    @NotBlank(message="Position title is required")
    private String positionTitle;

    private String jobDescription;

    @Enumerated(EnumType.STRING)//stores as "APPLIED instead of 0
    private ApplicationStatus status=ApplicationStatus.APPLIED;

    @CreationTimestamp//Automatically sets the date when saved
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    private boolean deleted=false;//for soft deletes:we dont delete the data when user clicks delete we just make deleted to true and rows are shown when deleted =false

    private String location;

    public enum ApplicationStatus{
        APPLIED,INTERVIEWING,OFFER,REJECTED
    }

}
