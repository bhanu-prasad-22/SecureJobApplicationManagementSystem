package com.example.jobtracker.model;


import com.example.jobtracker.model.dto.JobApplicationRequest;
import com.example.jobtracker.model.dto.JobApplicationResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController //Tells Spring this class handles JSON requests
//combo of @Controller @ResponseBody
//tells Spring to convert java object returned by method into JSON automatically
@RequestMapping("/api/applications")//Base URL
@RequiredArgsConstructor
public class JobApplicationController {
    private final JobApplicationService service;

    //create a new application
    @PostMapping//listens to HTTP POST requests
    public JobApplicationResponse create(@Valid @RequestBody JobApplicationRequest request)
    //@Valid checks if @NotBlank values we put in entity
    //if JSON is missing the values ,this will stop request right here
    //@RequestBody tell spring to look at JSON the user sent int the body
    //and turn it into a JobApplication object
    {
        return service.createApplication(request);
    }

    //get All applications
    @GetMapping//listens get requests
    //We use @RequestParam with default values so the user doesn't have to provide them.
    public Page<JobApplicationResponse> getAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(required = false) String company)
    {

        return service.getAllApplications(company,page,size);
    }

    //get by id
    @GetMapping("/{id}")
    public JobApplicationResponse getOne(@PathVariable UUID id){

        return service.getById(id);
    }

    //Update the status of Application
    @PutMapping("/{id}/status")
    public JobApplicationResponse updateStatus(
            @PathVariable UUID id,
            @RequestBody java.util.Map<String, String> body // Look in the JSON body
    ) {
        // Extract the string from the JSON {"status": "INTERVIEWING"}
        String statusStr = body.get("status");

        // Convert to your Enum
        JobApplication.ApplicationStatus status =
                JobApplication.ApplicationStatus.valueOf(statusStr);

        return service.updateStatus(id, status);
    }

    //Delete(soft)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable UUID id)
    {
        service.softDelete(id);
        return ResponseEntity.ok("Application deleted Succesfully");
    }
}
