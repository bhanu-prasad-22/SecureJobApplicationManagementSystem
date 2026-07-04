package com.example.jobtracker.model;


import lombok.Data;

import java.util.List;

@Data
public class CareerInsightResponse {
    private String summary;             // The AI's overall advice
    private List<JobPath> suggestedPaths; // Predicted job roles
    private List<String> skillGaps;     // What the user needs to learn
    private String localMarketOutlook;   // SDG-8 specific context for their city
}

@Data
class JobPath {
    private String title;
    private int matchPercentage;

    public JobPath(String s, int i) {
        this.title=s;

        this.matchPercentage=i;
    }
}

