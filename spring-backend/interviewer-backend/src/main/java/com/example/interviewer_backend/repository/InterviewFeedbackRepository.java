package com.example.interviewer_backend.repository;

import com.example.interviewer_backend.entity.InterviewFeedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewFeedbackRepository
        extends JpaRepository<InterviewFeedback, Long> {

    List<InterviewFeedback> findByUserId(Long userId);

    InterviewFeedback findBySessionId(Long sessionId);
}