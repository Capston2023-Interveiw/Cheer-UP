package com.example.backend.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;
    private String status;

    @CreatedDate
    @Column(updatable = false)
    @Getter
    @NotNull
    private LocalDateTime createdAt;

    @Column(updatable = false)
    @Getter
    private LocalDateTime deletedAt;
    @ManyToOne
    private Member member;


    @OneToMany(mappedBy = "video", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<AnalysisLog> analysisLogs = new ArrayList<>();

    @Builder
    public Video(Long id, String url, String status, LocalDateTime createdAt, LocalDateTime deletedAt, Member member, List<AnalysisLog> analysisLogs) {
        this.id = id;
        this.url = url;
        this.status = status;
        this.createdAt = createdAt;
        this.member = member;
        this.deletedAt = deletedAt;
        this.analysisLogs = analysisLogs;
    }
}
