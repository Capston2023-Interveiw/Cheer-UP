package com.example.backend.member.entity;

import io.jsonwebtoken.Claims;
import lombok.*;

import javax.persistence.*;
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String accountId;
    @Setter
    private String password;
    private String email;
    private String username;
    private int gender;

    @Enumerated(EnumType.STRING)
    private Role role;

    public Member(Claims claims) {
        this.id = Long.parseLong(claims.get("id").toString());
    }
    @Builder
    public Member(Long id, String accountId, String password, String username, String email, int gender, Role role) {
        this.id = id;
        this.accountId = accountId;
        this.password = password;
        this.username = username;
        this.email = email;
        this.gender = gender;
        this.role = role;
    }
}
