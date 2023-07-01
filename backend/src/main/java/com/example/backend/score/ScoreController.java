package com.example.backend.score;

import com.example.backend.member.entity.Member;
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

    private final ScoreService scoreService;

    @GetMapping("/total")
    public ResponseEntity<List<ScoreResponse>> getResponseList(@AuthenticationPrincipal Member member, @PathVariable Long video_id){
        return ResponseEntity.ok(scoreService.findAllByVideoId(video_id));
    }

}
