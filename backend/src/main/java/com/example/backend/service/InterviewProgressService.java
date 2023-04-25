package com.example.backend.service;

import com.example.backend.dto.response.QuestionResponse;
import com.example.backend.mapper.InterviewProgressMapper;
import com.example.backend.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewProgressService {

    private final QuestionRepository questionRepository;
    private final InterviewProgressMapper progressMapper;

    public List<QuestionResponse> getQuestionList(Long id) {
        return progressMapper.getRandomQuestion(id);
    }
}
