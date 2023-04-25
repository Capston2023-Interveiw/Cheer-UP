package com.example.backend.repository;

import com.example.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepositoy extends JpaRepository<Member, Long> {
    Optional<Member> findMemberByAccountId(String accountId);
}