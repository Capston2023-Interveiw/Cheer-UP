package com.example.backend.member;

<<<<<<< HEAD:backend/src/main/java/com/example/backend/mapper/MemberMapper.java
import com.example.backend.dto.request.MemberRequest;
import com.example.backend.dto.response.MemberResponse;
import com.example.backend.entity.Member;
import com.example.backend.entity.Role;
=======
import com.example.backend.member.dto.request.MemberRequest;
import com.example.backend.member.dto.response.MemberResponse;
import com.example.backend.member.entity.Member;
import com.example.backend.member.entity.Role;
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898:backend/src/main/java/com/example/backend/member/MemberMapper.java
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {

    public Member mapToEntity(MemberRequest dto) {
        return Member.builder()
                .accountId(dto.getAccountId())
                .password(dto.getPassword())
                .username(dto.getUsername())
                .email(dto.getEmail())
                .gender(dto.getGender())
                .age(dto.getAge())
                .role(Role.ROLE_USER)
                .build();
    }

    public MemberResponse mapToDto(Member entity) {
        return MemberResponse.builder()
                .id(entity.getId())
                .accountId(entity.getAccountId())
                .build();
    }
}
