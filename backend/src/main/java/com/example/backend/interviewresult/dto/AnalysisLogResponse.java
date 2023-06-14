package com.example.backend.interviewresult.dto;

import com.example.backend.interviewresult.entity.Analysis;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnalysisLogResponse {

    private final Analysis analysis;
    private final String timestamp;
    private final String reason;
}
