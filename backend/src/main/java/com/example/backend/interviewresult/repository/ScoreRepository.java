package com.example.backend.interviewresult.repository;

import com.example.backend.interviewresult.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    Optional<Score> findByVideoId(Long video_id);
    List<Score> findAllByVideoId(Long video_id);

}
