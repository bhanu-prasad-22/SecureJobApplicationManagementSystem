package com.example.jobtracker.model;
import com.example.jobtracker.model.CareerInsightResponse;
import com.example.jobtracker.model.JobPath;
import com.example.jobtracker.model.UserProfile;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class CareerAgentService {

    public CareerInsightResponse generateAnalysis(UserProfile profile) {
        CareerInsightResponse response = new CareerInsightResponse();

        // 1. GET DATA FROM THE SPECIFIC USER
        String userSkills = profile.getTechnicalSkills().toLowerCase();
        String userLocation = profile.getCurrentCity();

        // 2. DYNAMIC SUMMARY
        response.setSummary("Analysis for " + userLocation + ": Based on your expertise in " + userSkills + ", we have mapped your path.");

        // 3. DYNAMIC SKILL GAPS
        List<String> gaps = new ArrayList<>();
        if (!userSkills.contains("docker")) gaps.add("Containerization (Docker)");
        if (!userSkills.contains("aws") && !userSkills.contains("cloud")) gaps.add("Cloud Infrastructure");
        if (!userSkills.contains("kubernetes")) gaps.add("Orchestration (K8s)");
        response.setSkillGaps(gaps);

        // 4. DYNAMIC MARKET OUTLOOK (SDG-8)
        if (userLocation.equalsIgnoreCase("Suryapet") || userLocation.equalsIgnoreCase("Warangal")) {
            response.setLocalMarketOutlook("Tier-2 Growth Zone: High demand for Remote Backend roles in Telangana.");
        } else {
            response.setLocalMarketOutlook("Metropolitan Zone: Competitive market for Full-stack roles.");
        }

        return response;
    }
}