package com.example.backend.interviewprocess;

import com.example.backend.interviewprocess.QuestionResponse;
import com.example.backend.interviewprocess.InterviewProgressMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewProgressService {

    private final InterviewProgressMapper progressMapper;

    public List<QuestionResponse> getQuestionList(Long id) {
        return progressMapper.getRandomQuestion(id);
    }
}
