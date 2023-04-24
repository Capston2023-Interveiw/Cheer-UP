package com.example.backend.service;

import com.example.backend.dto.TokenInfo;
import com.example.backend.dto.request.MemberLoginRequestDto;
import com.example.backend.dto.request.MemberRequest;
import com.example.backend.dto.response.MemberResponse;
import com.example.backend.entity.Member;
import com.example.backend.jwt.JwtTokenProvider;
import com.example.backend.mapper.MemberMapper;
import com.example.backend.repository.MemberRepositoy;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepositoy memberRepository;
    private final MemberMapper memberMapper;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void create(MemberRequest request) {
        Member member = memberMapper.mapToEntity(request);
        member.setPassword(passwordEncoder.encode(request.getPassword()));
        memberRepository.save(member);
    }

    @Transactional
    public TokenInfo login(MemberLoginRequestDto memberLoginRequestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = memberLoginRequestDto.toAuthentication();
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        return jwtTokenProvider.generateToken(authentication);
    }
    public MemberResponse getById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(EntityExistsException::new);
        return memberMapper.mapToDto(member);
    }

    public List<MemberResponse> getAll() {
        return memberRepository.findAll()
                .stream()
                .map(memberMapper::mapToDto)
                .collect(Collectors.toList());
    }
}
