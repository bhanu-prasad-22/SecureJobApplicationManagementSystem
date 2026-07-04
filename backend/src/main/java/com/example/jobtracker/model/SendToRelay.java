package com.example.jobtracker.model;

import com.example.jobtracker.model.UserProfile;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@Service
public class SendToRelay {

    private final RestTemplate restTemplate = new RestTemplate();

    public void triggerWorkflow(UserProfile profile) {
        String relayUrl = "https://hook.relay.app/api/v1/playbook/cmnmzmbjr2hd50qm2b3326n71/trigger/kcTWArnhPUr__5srZIvuTg";

        Map<String, Object> insightData = new HashMap<>();
        // Using getEmail() because your User model defines 'email'
        insightData.put("user_name", profile.getUser().getEmail());
        insightData.put("skills", profile.getTechnicalSkills());
        insightData.put("location", profile.getCurrentCity());

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(relayUrl, insightData, String.class);
            System.out.println("Relay Webhook Success! Status: " + response.getStatusCode());
        } catch (Exception e) {
            System.err.println("Failed to send to Relay: " + e.getMessage());
        }
    }
}