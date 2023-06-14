package com.example.backend.interviewresult.mapper;

import com.example.backend.interviewresult.dto.AnalysisLogResponse;
import com.example.backend.interviewresult.dto.VideoResponse;
import com.example.backend.interviewresult.entity.Video;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VideoMapper {

    Logger logger = LoggerFactory.getLogger(VideoMapper.class);
    public VideoResponse mapToDto(Video entity) {
        logger.info(entity.toString());
        List<AnalysisLogResponse> analysisLogs = entity.getAnalysisLogs().stream()
                .map(AnalysisLogMapper::mapToDto).toList();
        return VideoResponse.builder()
                .url(entity.getUrl())
                .analysisLogs(analysisLogs)
                .build();
    }
}
