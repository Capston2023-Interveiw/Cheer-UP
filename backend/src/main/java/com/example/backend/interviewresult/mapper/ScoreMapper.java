package com.example.backend.interviewresult.mapper;

import com.example.backend.interviewresult.dto.ScoreResponse;
import com.example.backend.interviewresult.entity.Score;
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
