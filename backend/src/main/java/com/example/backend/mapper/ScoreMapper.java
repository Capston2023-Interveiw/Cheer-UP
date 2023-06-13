package com.example.backend.mapper;

import com.example.backend.dto.response.ScoreResponse;
import com.example.backend.entity.Score;
import org.springframework.stereotype.Component;


@Component
public class ScoreMapper {
    public ScoreResponse mapToDto(Score entity) {
        return ScoreResponse.builder()
                .score(entity.getScore())
                .analysis_type(entity.getAnalysis().getType())
                .build();
    }
}
