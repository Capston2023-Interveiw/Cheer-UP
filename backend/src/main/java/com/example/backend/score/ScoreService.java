package com.example.backend.score;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScoreService {

    private final ScoreMapper scoreMapper;
    private final ScoreRepository scoreRepository;

    public List<ScoreResponse> findAllByVideoId(Long video_id) {
        return scoreRepository.findAllByVideoId(video_id)
                        .stream()
                        .map(scoreMapper::mapToDto)
                        .collect(Collectors.toList());
    }
}