package com.example.backend.entity;

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
    private int age;
    private int gender;

    @Column(columnDefinition="default Role.ROLE_USER")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder
    public Member(Long id, String accountId, String password, String username, String email, int age, int gender, Role role) {
        this.id = id;
        this.accountId = accountId;
        this.password = password;
        this.username = username;
        this.email = email;
        this.age = age;
        this.gender = gender;
        this.role = role;
    }
}
