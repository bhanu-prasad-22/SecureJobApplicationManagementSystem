package com.example.jobtracker.model.dto;

import lombok.Data;

@Data
public class ProfileRequest {
    private String skills;
    private String location;
    private String resumeText;
}
