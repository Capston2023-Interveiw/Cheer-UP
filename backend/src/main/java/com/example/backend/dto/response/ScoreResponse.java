package com.example.backend.dto.response;

import com.example.backend.entity.Analysis;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ScoreResponse {

    private int score;
    private String analysis_type;
}
