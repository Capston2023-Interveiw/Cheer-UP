package com.example.backend.question;

import com.example.backend.member.entity.Member;
import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String status;
    @CreatedDate
    @Column(updatable = false)
    @Getter
    @NotNull
    private LocalDateTime createdAt;

    @ManyToOne
    private Member member;

    @Builder
    public Question(Long id, String content, String status, LocalDateTime createdAt, Member member) {
        this.id = id;
        this.content = content;
        this.status = status;
        this.createdAt = createdAt;
        this.member = member;
    }
}