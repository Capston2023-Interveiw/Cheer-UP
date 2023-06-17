package com.example.backend.interviewresult.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class VideoResponse {

    private final String url;
    private final String score;
    private final String feedback;
    private final List<Object> logs;
}
