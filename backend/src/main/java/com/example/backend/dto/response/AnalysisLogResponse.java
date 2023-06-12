package com.example.backend.dto.response;

import com.example.backend.entity.VideoAnalysisLog;
import lombok.Builder;
import lombok.Getter;

import java.util.Set;

@Getter
@Builder
public class AnalysisLogResponse {

    private String url;
    private Set<VideoAnalysisLog> analysisLogs;
}
