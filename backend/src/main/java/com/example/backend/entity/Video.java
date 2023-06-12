package com.example.backend.entity;

import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

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

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL)
    private Set<VideoAnalysisLog> videoAnalysisLogs = new HashSet<>();

    @Builder
    public Video(Long id, String url, String status, LocalDateTime createdAt, LocalDateTime deletedAt, Member member, Set<AnalysisLog> videoAnalysisLogs) {
        this.id = id;
        this.url = url;
        this.status = status;
        this.createdAt = createdAt;
        this.member = member;
        this.deletedAt = deletedAt;
        setVideoAnalysisLog(videoAnalysisLogs);
    }

    public void setVideoAnalysisLog(Set<AnalysisLog> videoAnalysisLogs) {
        this.videoAnalysisLogs =
                videoAnalysisLogs.stream()
                        .map(analysisLog -> new VideoAnalysisLog(this, analysisLog))
                        .collect(Collectors.toSet());

    }
}
