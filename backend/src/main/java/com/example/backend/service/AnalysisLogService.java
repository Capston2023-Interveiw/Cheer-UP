package com.example.backend.service;

import com.example.backend.dto.response.VideoResponse;
import com.example.backend.entity.Video;
import com.example.backend.mapper.VideoMapper;
import com.example.backend.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;

@Service
@RequiredArgsConstructor
public class AnalysisLogService {

    private final VideoMapper videoMapper;
    private final VideoRepository videoRepository;

    public VideoResponse findFaceResult(Long video_id) {
        Video video = videoRepository.findById(video_id).orElseThrow(EntityExistsException::new);
        return videoMapper.mapToDto(video);
    }
}
