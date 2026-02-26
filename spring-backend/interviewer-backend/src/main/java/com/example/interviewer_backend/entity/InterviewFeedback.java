package com.example.interviewer_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "interview_feedback")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewFeedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sessionId;

    private Long userId;

    private String role;

    private LocalDateTime interviewDate;

    private String duration;

    // Overall scores
    private int overallScore;
    private int technicalScore;
    private int communicationScore;
    private int logicalReasoningScore;
    private int problemSolvingSpeedScore;

    // Technical breakdown
    private int codeCorrectnessScore;
    private int timeComplexityScore;
    private int spaceComplexityScore;
    private int codeReadabilityScore;
    private int edgeCaseHandlingScore;
    private int bestPracticesScore;

    // Communication breakdown
    private int problemArticulationScore;
    private int thoughtNarrationScore;
    private int clarityScore;
    private int confidenceScore;

    // Summary
    @Column(length = 1000)
    private String strengths;

    @Column(length = 1000)
    private String weaknesses;

    @Column(length = 2000)
    private String aiFeedbackSummary;
}