package com.example.backend.interviewresult.repository;

import com.example.backend.interviewresult.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {
}