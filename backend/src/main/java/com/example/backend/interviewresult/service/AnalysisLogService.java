package com.example.backend.interviewresult.service;

import com.example.backend.interviewresult.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalysisLogService {

    private final VideoRepository videoRepository;

    public List<Object> findFaceResult(Long video_id, String analysis_type) {
        return videoRepository.findLogsById(video_id, analysis_type);
    }
}
