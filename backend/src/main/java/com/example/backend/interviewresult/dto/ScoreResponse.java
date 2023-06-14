package com.example.backend.interviewresult.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ScoreResponse {

    private int score;
    private String analysis_type;
}
