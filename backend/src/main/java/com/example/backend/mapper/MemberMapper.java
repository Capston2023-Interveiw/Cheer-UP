package com.example.backend.mapper;

import com.example.backend.dto.request.MemberRequest;
import com.example.backend.dto.response.MemberResponse;
import com.example.backend.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {

    public Member mapToEntity(MemberRequest dto) {
        return Member.builder()
                .accountId(dto.getAccountId())
                .password(dto.getPassword())
                .email(dto.getEmail())
                .gender(dto.getGender())
                .age(dto.getAge())
                .build();
    }

    public MemberResponse mapToDto(Member entity) {
        return MemberResponse.builder()
                .id(entity.getId())
                .accountId(entity.getAccountId())
                .build();
    }
}
