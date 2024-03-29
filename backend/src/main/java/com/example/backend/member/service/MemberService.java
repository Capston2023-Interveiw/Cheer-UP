package com.example.backend.member.service;

import com.example.backend.member.dto.TokenInfo;
import com.example.backend.member.entity.Member;
import com.example.backend.member.MemberMapper;
import com.example.backend.member.MemberRepository;
import com.example.backend.member.dto.request.MemberLoginRequest;
import com.example.backend.member.dto.request.MemberRequest;
import com.example.backend.member.dto.response.MemberResponse;
import com.example.backend.member.exception.MemberException;
import com.example.backend.member.exception.MemberExceptionType;
import com.example.backend.member.jwt.JwtTokenProvider;

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
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void create(MemberRequest request) throws Exception {
        Member member = memberMapper.mapToEntity(request);
        member.setPassword(passwordEncoder.encode(request.getPassword()));
        if (memberRepository.findMemberByAccountId(member.getAccountId()).isPresent()) {
            throw new MemberException(MemberExceptionType.ALREADY_EXIST_ACCOUNTID);
        }
        if (memberRepository.findMemberByEmail(member.getEmail()).isPresent()) {
            throw new MemberException(MemberExceptionType.ALREADY_EXIST_EMAIL);
        }
        memberRepository.save(member);
    }

    @Transactional
    public TokenInfo login(MemberLoginRequest memberLoginRequest) {
        UsernamePasswordAuthenticationToken authenticationToken = memberLoginRequest.toAuthentication();
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        Member member = memberRepository.findMemberByAccountId(memberLoginRequest.getAccountId()).orElseThrow();
        return jwtTokenProvider.generateToken(authentication, member.getId());
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
