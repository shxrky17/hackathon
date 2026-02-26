package com.example.interviewer_backend.service;

import com.example.interviewer_backend.dto.InterviewFeedbackRequest;
import com.example.interviewer_backend.entity.InterviewFeedback;
import com.example.interviewer_backend.repository.InterviewFeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewFeedbackService {

    private final InterviewFeedbackRepository repository;

    public InterviewFeedback saveFeedback(InterviewFeedbackRequest request) {

        InterviewFeedback feedback = InterviewFeedback.builder()
                .sessionId(request.getSessionId())
                .userId(request.getUserId())
                .role(request.getRole())
                .duration(request.getDuration())
                .interviewDate(LocalDateTime.now())

                .overallScore(request.getOverallScore())
                .technicalScore(request.getTechnicalScore())
                .communicationScore(request.getCommunicationScore())
                .logicalReasoningScore(request.getLogicalReasoningScore())
                .problemSolvingSpeedScore(request.getProblemSolvingSpeedScore())

                .codeCorrectnessScore(request.getCodeCorrectnessScore())
                .timeComplexityScore(request.getTimeComplexityScore())
                .spaceComplexityScore(request.getSpaceComplexityScore())
                .codeReadabilityScore(request.getCodeReadabilityScore())
                .edgeCaseHandlingScore(request.getEdgeCaseHandlingScore())
                .bestPracticesScore(request.getBestPracticesScore())

                .problemArticulationScore(request.getProblemArticulationScore())
                .thoughtNarrationScore(request.getThoughtNarrationScore())
                .clarityScore(request.getClarityScore())
                .confidenceScore(request.getConfidenceScore())

                .strengths(request.getStrengths())
                .weaknesses(request.getWeaknesses())
                .aiFeedbackSummary(request.getAiFeedbackSummary())

                .build();

        return repository.save(feedback);
    }

    public InterviewFeedback getBySessionId(Long sessionId) {
        return repository.findBySessionId(sessionId);
    }

    public List<InterviewFeedback> getByUserId(Long userId) {
        return repository.findByUserId(userId);
    }
}