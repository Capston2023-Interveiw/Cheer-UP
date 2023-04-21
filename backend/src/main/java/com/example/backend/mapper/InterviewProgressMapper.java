package com.example.backend.mapper;

import com.example.backend.dto.response.QuestionResponse;
import com.example.backend.entity.Question;
import org.springframework.stereotype.Component;

@Component
public class InterviewProgressMapper {

    public QuestionResponse mapToDto(Question question) {
        return QuestionResponse.builder()
                .content(question.getContent())
                .build();
    }
}
