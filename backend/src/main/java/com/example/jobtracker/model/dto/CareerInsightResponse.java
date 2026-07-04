package com.example.jobtracker.model.dto;


import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
public class CareerInsightResponse {
    private String summary;
    private List<JobPath> suggestedPaths;
    private List<String> skillGaps;
    private String localMarketOutlook;
}

@Data
@RequiredArgsConstructor
class JobPath {
    private String title;
    private int matchPercentage;

    public JobPath(String title, int matchPercentage) {
        this.title = title;
        this.matchPercentage = matchPercentage;
    }
}