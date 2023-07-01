package com.example.backend.analysislog;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnalysisLogService {

    private final AnalysisLogRepository analysisLogRepository;
    private final AnalysisLogMapper analysisLogMapper;

    public AnalysisLogResponse findFaceResult(Long video_id, String analysis_type) {
        List<Object> objects =  analysisLogRepository.findLogsById(video_id, analysis_type);
        return analysisLogMapper.mapToDto(objects);
    }
}
