package com.example.backend.interviewresult.repository;

import com.example.backend.interviewresult.entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {

    @Query(value = "SELECT url FROM video WHERE id = :id" +
            " UNION All " +
            "SELECT score FROM score WHERE analysis_id = (select id from analysis where type=:analysis_type)" +
            " UNION All " +
            "SELECT (select content from feedback where id=feedback_id) From score WHERE analysis_id=(select id from analysis where type=:analysis_type)" +
            " UNION ALL " +
            "SELECT JSON_OBJECT('reason', reason, 'timestamp', timestamp) FROM analysis_log where video_id=:id and analysis_id=(select id from analysis where type=:analysis_type) group by reason, timestamp;", nativeQuery = true)
    List<Object> findLogsById(@Param("id") Long id, @Param("analysis_type") String analysis_type);
}