package com.example.backend.controller;

import com.example.backend.dto.response.ScoreResponse;
import com.example.backend.dto.response.VideoResponse;
import com.example.backend.entity.Member;
import com.example.backend.service.AnalysisLogService;
import com.example.backend.service.TotalScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/result/{video_id}")
public class ScoreController {

    private final TotalScoreService totalScoreService;
    private final AnalysisLogService analysisLogService;

    @GetMapping("/total")
    public ResponseEntity<List<ScoreResponse>> getResponseList(@AuthenticationPrincipal Member member, @PathVariable long video_id){
        return ResponseEntity.ok(totalScoreService.findAllByVideoId(video_id));
    }

    @GetMapping("/face")
    public ResponseEntity<VideoResponse> getFaceAnalysisLog(@AuthenticationPrincipal Member member, @PathVariable Long video_id){
        return ResponseEntity.ok(analysisLogService.findFaceResult(video_id));
    }
}
