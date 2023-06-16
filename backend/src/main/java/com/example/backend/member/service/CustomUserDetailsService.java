package com.example.backend.member.service;

<<<<<<< HEAD:backend/src/main/java/com/example/backend/service/CustomUserDetailsService.java
import com.example.backend.entity.Member;
import com.example.backend.repository.MemberRepository;
=======
import com.example.backend.member.entity.Member;
import com.example.backend.member.MemberRepository;
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898:backend/src/main/java/com/example/backend/member/service/CustomUserDetailsService.java
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String accountId) throws UsernameNotFoundException {
        return memberRepository.findMemberByAccountId(accountId)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
    }

    private UserDetails createUserDetails(Member member) {
        String role;
        if (String.valueOf(member.getRole()).equals("ROLE_ADMIN")) {
            role = "ADMIN";
        }
        else {
            role = "USER";
        }
        return User.builder()
                .username(member.getAccountId())
                .password(member.getPassword())
                .roles(role)
                .build();
    }
}
