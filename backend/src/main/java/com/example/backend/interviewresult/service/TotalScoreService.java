package com.example.backend.interviewresult.service;

import com.example.backend.interviewresult.dto.ScoreResponse;
import com.example.backend.interviewresult.mapper.ScoreMapper;
import com.example.backend.interviewresult.repository.ScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TotalScoreService {

    private final ScoreMapper scoreMapper;
    private final ScoreRepository scoreRepository;

    public List<ScoreResponse> findAllByVideoId(Long video_id) {
        return scoreRepository.findAllByVideoId(video_id)
                        .stream()
                        .map(scoreMapper::mapToDto)
                        .collect(Collectors.toList());
    }
}