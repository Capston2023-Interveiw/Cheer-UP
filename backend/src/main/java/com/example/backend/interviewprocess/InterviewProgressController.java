package com.example.backend.interviewprocess;

import com.example.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    public ResponseEntity<List<QuestionResponse>> getQuestionList(@AuthenticationPrincipal Member member) {
        return ResponseEntity.ok(interviewProgressService.getQuestionList(member.getId()));
    }
}