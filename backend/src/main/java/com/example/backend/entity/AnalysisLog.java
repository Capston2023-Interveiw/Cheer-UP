package com.example.backend.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "analysis_log")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnalysisLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String timestamp;
    private String reason;

    @OneToOne
    private Analysis analysis;

    @ManyToOne
    @JoinColumn(name = "video_id")
    @ToString.Exclude
    private Video video;

    public AnalysisLog(Long id, String timestamp, String reason, Analysis analysis, Video video) {
        this.id = id;
        this.timestamp = timestamp;
        this.reason = reason;
        this.analysis = analysis;
        this.video = video;
    }


}
