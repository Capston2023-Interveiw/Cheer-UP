package com.example.backend.score;

import com.example.backend.score.entity.Score;
import org.springframework.stereotype.Component;

@Component
public class ScoreMapper {
    public ScoreResponse mapToDto(Score entity) {
        return ScoreResponse.builder()
                .score(entity.getScore())
                .analysis_type(entity.getAnalysis().getType())
                .summary(entity.getSummary())
                .build();
    }
}
