package com.example.jobtracker.model.dto;

import com.example.jobtracker.model.Application;
import com.example.jobtracker.model.JobApplication;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class JobApplicationResponse {

    private UUID id;
    private String companyName;
    private String positionTitle;
    private JobApplication.ApplicationStatus status;
    private LocalDateTime createdAt;
    private String location;
    private String userEmail;   // NEW
}
