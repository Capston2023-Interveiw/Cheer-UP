package com.example.backend.interviewresult.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class VideoResponse {

    private String url;
    List<AnalysisLogResponse> analysisLogs;
}
