package com.example.interviewer_backend.controller;

import com.example.interviewer_backend.dto.InterviewFeedbackRequest;
import com.example.interviewer_backend.entity.InterviewFeedback;
import com.example.interviewer_backend.service.InterviewFeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class InterviewFeedbackController {

    private final InterviewFeedbackService service;

    // Save feedback from OpenAI
    @PostMapping("/save")
    public InterviewFeedback saveFeedback(
            @RequestBody InterviewFeedbackRequest request) {

        return service.saveFeedback(request);
    }

    // Get feedback by session
    @GetMapping("/session/{sessionId}")
    public InterviewFeedback getBySession(
            @PathVariable Long sessionId) {

        return service.getBySessionId(sessionId);
    }

    // Get feedback by user
    @GetMapping("/user/{userId}")
    public List<InterviewFeedback> getByUser(
            @PathVariable Long userId) {

        return service.getByUserId(userId);
    }
}