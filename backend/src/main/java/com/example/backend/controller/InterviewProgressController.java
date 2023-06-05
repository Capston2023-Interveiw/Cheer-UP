package com.example.backend.controller;

import com.example.backend.dto.response.QuestionResponse;
import com.example.backend.entity.Member;
import com.example.backend.service.InterviewProgressService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
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

    @ApiImplicitParams({@ApiImplicitParam(name = "Authorization", value = "인증 토큰", required = true, dataType = "string", paramType = "header")})
    @GetMapping("/progress")
    public ResponseEntity<List<QuestionResponse>> getQuestionList(@AuthenticationPrincipal Member member) {
        return ResponseEntity.ok(interviewProgressService.getQuestionList(member.getId()));
    }
}
