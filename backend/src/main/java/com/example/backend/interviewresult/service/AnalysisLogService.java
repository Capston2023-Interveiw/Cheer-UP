package com.example.backend.interviewresult.service;

import com.example.backend.interviewresult.dto.VideoResponse;
import com.example.backend.interviewresult.mapper.AnalysisLogMapper;
import com.example.backend.interviewresult.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalysisLogService {

    private final VideoRepository videoRepository;
    private final AnalysisLogMapper analysisLogMapper;

    public VideoResponse findFaceResult(Long video_id, String analysis_type) {
        List<Object> objects =  videoRepository.findLogsById(video_id, analysis_type);
        return analysisLogMapper.mapToDto(objects);
    }
}
