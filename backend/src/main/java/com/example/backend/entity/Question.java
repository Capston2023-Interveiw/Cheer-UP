package com.example.backend.entity;

import com.sun.istack.NotNull;
import lombok.AccessLevel;
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
    @NotNull
    private LocalDateTime createdAt;

    public Question(Long id, String content, String status, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.status = status;
        this.createdAt = createdAt;
    }
}
