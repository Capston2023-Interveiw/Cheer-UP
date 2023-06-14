package com.example.backend.interviewresult.mapper;

import com.example.backend.interviewresult.dto.AnalysisLogResponse;
import com.example.backend.interviewresult.entity.AnalysisLog;

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
