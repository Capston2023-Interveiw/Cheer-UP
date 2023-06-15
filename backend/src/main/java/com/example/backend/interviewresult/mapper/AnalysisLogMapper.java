package com.example.backend.interviewresult.mapper;

import com.example.backend.interviewresult.dto.VideoResponse;
import com.google.gson.Gson;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AnalysisLogMapper {

    public static final int VIDEO_URL = 0;
    public static final int FIELD_SCORE = 1;
    public static final int FEEDBACK = 2;
    public static final int LOG_START = 3;

    public VideoResponse mapToDto(List<Object> entity) {
        List<Object> logs = entity.subList(LOG_START, entity.size()).stream().map(log -> new Gson().fromJson((String) log, Object.class)).collect(Collectors.toList());
        return VideoResponse.builder()
                .url(entity.get(VIDEO_URL).toString())
                .score(entity.get(FIELD_SCORE).toString())
                .feedback(entity.get(FEEDBACK).toString())
                .logs(logs)
                .build();
    }
}
