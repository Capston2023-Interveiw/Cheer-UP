<<<<<<< HEAD:backend/src/main/java/com/example/backend/repository/MemberRepository.java
package com.example.backend.repository;

import com.example.backend.entity.Member;
=======
package com.example.backend.member;

import com.example.backend.member.entity.Member;
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898:backend/src/main/java/com/example/backend/member/MemberRepository.java
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findMemberByAccountId(String accountId);
    Optional<Member> findMemberByEmail(String email);
}
