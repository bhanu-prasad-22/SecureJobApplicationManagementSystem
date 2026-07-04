package com.example.jobtracker.model;

import com.example.jobtracker.model.dto.JobApplicationRequest;
import com.example.jobtracker.model.dto.JobApplicationResponse;
import com.example.jobtracker.model.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository repository;
    private final UserRepository userRepository;

    // 1. CLEANED UP HELPER: Get current user from SecurityContext
    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
    }

    // Helper to get entity by ID and verify ownership
    private JobApplication getEntityById(UUID id) {
        JobApplication entity = repository.findById(id)
                .filter(app -> !app.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Job Application not Found!"));

        User currentUser = getCurrentUser();

        // If not an admin AND not the owner, block access
        if (currentUser.getRole() != User.Role.ADMIN && !entity.getUser().getId().equals(currentUser.getId())) {
            throw new ResourceNotFoundException("Job Application not found or access denied!");
        }

        return entity;
    }

    // Inside JobApplicationService.java
    public Page<JobApplicationResponse> getAllApplications(String companyName, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        // 1. Get the currently logged-in user
        User currentUser = getCurrentUser(); // Ensure you have this helper method

        Page<JobApplication> entityPage;

        // 2. ADMIN ROLE CHECK
        if (currentUser.getRole() == User.Role.ADMIN) {
            // Admins see EVERYTHING
            if (companyName != null && !companyName.isEmpty()) {
                entityPage = repository.findByCompanyNameContainingIgnoreCaseAndDeletedFalse(companyName, pageable);
            } else {
                entityPage = repository.findAllByDeletedFalse(pageable);
            }
        } else {
            // Normal Users see only THEIR OWN jobs
            if (companyName != null && !companyName.isEmpty()) {
                entityPage = repository.findByUserAndCompanyNameContainingIgnoreCaseAndDeletedFalse(currentUser, companyName, pageable);
            } else {
                entityPage = repository.findAllByUserAndDeletedFalse(currentUser, pageable);
            }
        }
        return entityPage.map(this::mapToResponse);
    }

    public JobApplicationResponse createApplication(JobApplicationRequest request) {
        JobApplication entity = new JobApplication();
        entity.setCompanyName(request.getCompanyName());
        entity.setPositionTitle(request.getPositionTitle());
        entity.setJobDescription(request.getJobDescription());
        entity.setLocation(request.getLocation());

        // 3. LINKING: Attach the current user to the new job
        entity.setUser(getCurrentUser());

        return mapToResponse(repository.save(entity));
    }

    public JobApplicationResponse getById(UUID id) {
        return mapToResponse(getEntityById(id));
    }

    public JobApplicationResponse updateStatus(UUID id, JobApplication.ApplicationStatus status) {
        JobApplication entity = getEntityById(id);
        entity.setStatus(status);
        return mapToResponse(repository.save(entity));
    }

    public void softDelete(UUID id) {
        JobApplication app = getEntityById(id);
        app.setDeleted(true);
        repository.save(app);
    }

    private JobApplicationResponse mapToResponse(JobApplication entity) {

        JobApplicationResponse dto = new JobApplicationResponse();

        dto.setId(entity.getId());
        dto.setCompanyName(entity.getCompanyName());
        dto.setPositionTitle(entity.getPositionTitle());
        dto.setStatus(entity.getStatus());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setLocation(entity.getLocation());
        dto.setUserEmail(entity.getUser().getEmail()); // NEW

        return dto;
    }
}