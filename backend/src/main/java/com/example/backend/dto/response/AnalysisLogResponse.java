package com.example.backend.dto.response;

import com.example.backend.entity.Analysis;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnalysisLogResponse {

    private final Analysis analysis;
    private final String timestamp;
    private final String reason;
}
