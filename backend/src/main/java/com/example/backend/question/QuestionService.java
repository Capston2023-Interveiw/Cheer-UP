package com.example.backend.question;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionMapper progressMapper;

    public List<QuestionResponse> getQuestionList(Long id) {
        return progressMapper.getRandomQuestion(id);
    }
}
