package com.example.backend.mapper;

import com.example.backend.dto.response.AnalysisLogResponse;
import com.example.backend.entity.Video;
import org.springframework.stereotype.Component;

@Component
public class AnalysisLogMapper {

    AnalysisLogResponse mapToDto(Video entity) {
        return AnalysisLogResponse.builder()
                .url(entity.getUrl())
                .analysisLogs(entity.getVideoAnalysisLogs())
                .build();
    }
}
