package com.example.backend.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer score;

    @ManyToOne
    private Video video;
    @OneToOne
    private Feedback feedback;
    @OneToOne
    private Analysis analysis;


    public Score(Long id, Integer score, Video video, Feedback feedback, Analysis analysis) {
        this.id = id;
        this.score = score;
        this.feedback = feedback;
        this.video = video;
        this.analysis = analysis;
    }
}
