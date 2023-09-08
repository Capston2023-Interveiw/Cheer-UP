package com.example.backend.analysislog;

import com.example.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/result/{video_id}")
public class AnalysisLogController {

    private final AnalysisLogService analysisLogService;

    @GetMapping("/{analysis_type}")
    public ResponseEntity<AnalysisLogResponse> getFaceAnalysisLog(@AuthenticationPrincipal Member member, @PathVariable Long video_id, @PathVariable String analysis_type){
        return ResponseEntity.ok(analysisLogService.findFaceResult(video_id, analysis_type));
    }
}
