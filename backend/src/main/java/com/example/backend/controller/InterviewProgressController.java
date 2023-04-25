package com.example.backend.controller;

import com.example.backend.dto.response.QuestionResponse;
import com.example.backend.service.InterviewProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/interview")
public class InterviewProgressController {

    private final InterviewProgressService interviewProgressService;

    @GetMapping("/progress")
    public ResponseEntity<List<QuestionResponse>> getQuestionList() {
        return ResponseEntity.ok(interviewProgressService.getQuestionList(1L));
    }
}
