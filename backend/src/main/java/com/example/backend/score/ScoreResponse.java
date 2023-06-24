package com.example.backend.score;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ScoreResponse {

    private int score;
    private String analysis_type;
}