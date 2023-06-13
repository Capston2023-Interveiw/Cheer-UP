package com.example.backend.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AnalysisLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String timestamp;
    private String reason;

    @ManyToOne
    private Video video;
    @OneToOne
    private Analysis analysis;

    public AnalysisLog(Long id, String timestamp, String reason, Video video, Analysis analysis) {
        this.id = id;
        this.timestamp = timestamp;
        this.reason = reason;
        this.video = video;
        this.analysis = analysis;
    }
}
