package com.example.backend.interviewprocess;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InterviewProgressMapper {

    @Select("SELECT content FROM question where member_id=#{id} ORDER BY id ASC, RAND() LIMIT 6")
    List<QuestionResponse> getRandomQuestion(Long id);
}
