package com.example.jobtracker.model;

import com.example.jobtracker.model.JobApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;
//why interface because to save JobApplication we have write JDBC program
//instead we use a generic interface JpaRepository which handles JobApplications object UUID primary Key
//we use save(), findById(), findAll(), and delete() for free.

public interface JobApplicationRepository extends JpaRepository<JobApplication, UUID> {

    // Admin methods (already in your file)
    Page<JobApplication> findAllByDeletedFalse(Pageable pageable);
    Page<JobApplication> findByCompanyNameContainingIgnoreCaseAndDeletedFalse(String companyName, Pageable pageable);

    // NEW: User ownership methods
    Page<JobApplication> findAllByUserAndDeletedFalse(User user, Pageable pageable);
    Page<JobApplication> findByUserAndCompanyNameContainingIgnoreCaseAndDeletedFalse(User user, String companyName, Pageable pageable);
}
