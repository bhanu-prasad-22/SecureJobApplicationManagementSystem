package com.example.jobtracker.model; // Ensure this matches your folder structure

import com.example.jobtracker.model.CareerInsightResponse;
import com.example.jobtracker.model.UserProfile;
import com.example.jobtracker.model.CareerAgentService;
import com.example.jobtracker.model.UserProfileService;
import com.example.jobtracker.model.SendToRelay; // 1. Import your Relay service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agent")
@CrossOrigin(origins = "http://localhost:5173")
public class CareerAgentController {

    @Autowired
    private CareerAgentService agentService;

    @Autowired
    private UserProfileService profileService;

    @Autowired
    private SendToRelay relayService; // 2. Inject the Relay service

    @GetMapping("/analyze")
    public ResponseEntity<CareerInsightResponse> getCareerAnalysis() {
        UserProfile profile = profileService.getCurrentUserProfile();

        if (profile == null) {
            return ResponseEntity.badRequest().build();
        }

        // Reasoning Step
        CareerInsightResponse analysis = agentService.generateAnalysis(profile);

        // ACTION STEP: Trigger the Relay.app Workflow
        // This is what sends the Gmail!
        try {
            relayService.triggerWorkflow(profile);
            System.out.println("Relay Webhook triggered for user: " + profile.getUser().getEmail());
        } catch (Exception e) {
            // Log the error but still return the analysis so the UI doesn't break
            System.err.println("Failed to trigger Relay: " + e.getMessage());
        }

        return ResponseEntity.ok(analysis);
    }
}