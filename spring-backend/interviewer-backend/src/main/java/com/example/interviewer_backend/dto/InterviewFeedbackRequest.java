package com.example.interviewer_backend.dto;

import lombok.Data;

@Data
public class InterviewFeedbackRequest {

    private Long sessionId;
    private Long userId;
    private String role;
    private String duration;

    private int overallScore;
    private int technicalScore;
    private int communicationScore;
    private int logicalReasoningScore;
    private int problemSolvingSpeedScore;

    private int codeCorrectnessScore;
    private int timeComplexityScore;
    private int spaceComplexityScore;
    private int codeReadabilityScore;
    private int edgeCaseHandlingScore;
    private int bestPracticesScore;

    private int problemArticulationScore;
    private int thoughtNarrationScore;
    private int clarityScore;
    private int confidenceScore;

    private String strengths;
    private String weaknesses;
    private String aiFeedbackSummary;
}