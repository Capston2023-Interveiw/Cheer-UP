package com.example.backend.service;

import com.example.backend.dto.response.ScoreResponse;
import com.example.backend.mapper.ScoreMapper;
import com.example.backend.repository.ScoreRepository;
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