package com.example.backend.mapper;

import com.example.backend.dto.response.QuestionResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InterviewProgressMapper {

    @Select("SELECT content FROM question ORDER BY #{id} desc, RAND() LIMIT 6;")
    List<QuestionResponse> getRandomQuestion(Long id);
}
