package com.example.backend.interviewresult;

import com.example.backend.interviewresult.dto.ScoreResponse;
import com.example.backend.interviewresult.dto.VideoResponse;
import com.example.backend.member.entity.Member;
import com.example.backend.interviewresult.service.AnalysisLogService;
import com.example.backend.interviewresult.service.TotalScoreService;
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
    public ResponseEntity<List<ScoreResponse>> getResponseList(@AuthenticationPrincipal Member member, @PathVariable Long video_id){
        return ResponseEntity.ok(totalScoreService.findAllByVideoId(video_id));
    }

    @GetMapping("/{analysis_type}")
    public ResponseEntity<VideoResponse> getFaceAnalysisLog(@AuthenticationPrincipal Member member, @PathVariable Long video_id, @PathVariable String analysis_type){
        return ResponseEntity.ok(analysisLogService.findFaceResult(video_id, analysis_type));
    }
}
