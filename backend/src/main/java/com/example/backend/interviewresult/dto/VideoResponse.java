package com.example.backend.interviewresult.dto;

import com.example.backend.interviewresult.entity.Score;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class VideoResponse {

    private String url;
    private Score score;
    List<AnalysisLogResponse> analysisLogs;
}
