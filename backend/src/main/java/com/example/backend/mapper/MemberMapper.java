package com.example.backend.mapper;

import com.example.backend.dto.request.MemberRequest;
import com.example.backend.dto.response.MemberResponse;
import com.example.backend.entity.Member;
import com.example.backend.entity.Role;
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
