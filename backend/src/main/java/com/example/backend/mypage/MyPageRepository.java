package com.example.backend.mypage;

import com.example.backend.interviewresult.entity.Score;
import com.example.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyPageRepository extends JpaRepository<Member, Long> {

    Optional<Member> findMemberByAccountId(String accountId);
    Optional<Score> findByVideoId(Long video_id);
    List<Score> findAllByVideoId(Long video_id);
}
