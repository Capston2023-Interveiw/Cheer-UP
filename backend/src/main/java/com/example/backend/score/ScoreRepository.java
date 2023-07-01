package com.example.backend.score;

import com.example.backend.score.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

    List<Score> findAllByVideoId(Long video_id);
}
