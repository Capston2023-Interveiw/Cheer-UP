package com.example.backend.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private Integer score;
    @ManyToOne
    private Analysis analysis;

    @Builder
    public Feedback(Long id, String content, Integer score, Analysis analysis) {
        this.id = id;
        this.content = content;
        this.score = score;
        this.analysis = analysis;
    }
}