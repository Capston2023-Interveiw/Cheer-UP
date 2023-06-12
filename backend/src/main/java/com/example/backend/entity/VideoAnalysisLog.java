package com.example.backend.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class VideoAnalysisLog {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "video_id")
    private Video video;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "analysis_log_id")
    private AnalysisLog analysisLog;

    @Builder
    public VideoAnalysisLog(Video video, AnalysisLog analysisLog) {
        this.video = video;
        this.analysisLog = analysisLog;
    }
}
