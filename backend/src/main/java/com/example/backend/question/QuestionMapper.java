package com.example.backend.question;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface QuestionMapper {

    @Select("SELECT content FROM question where member_id=#{id} ORDER BY id ASC, RAND() LIMIT 6")
    List<QuestionResponse> getRandomQuestion(Long id);
}
