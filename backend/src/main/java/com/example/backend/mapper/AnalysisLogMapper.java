package com.example.backend.mapper;

import com.example.backend.dto.response.AnalysisLogResponse;
import com.example.backend.entity.AnalysisLog;

import org.springframework.stereotype.Component;

@Component
public class AnalysisLogMapper {

    public static AnalysisLogResponse mapToDto(AnalysisLog entity) {
        return AnalysisLogResponse.builder()
                .analysis(entity.getAnalysis())
                .reason(entity.getReason())
                .timestamp(entity.getTimestamp())
                .build();
    }
}
