package com.example.jobtracker.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JobApplicationRequest {
    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Position is required")
    private String positionTitle;

    private String JobDescription;
    private String location;
}
