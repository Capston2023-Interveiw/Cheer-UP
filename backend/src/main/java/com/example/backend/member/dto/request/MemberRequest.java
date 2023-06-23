package com.example.backend.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberRequest {

    @NotBlank(message = "아이디는 필수 입력사항 입니다.")
    private String accountId;
    @NotBlank(message = "비밀번호는 필수 입력사항 입니다.")
    private String password;
    @NotBlank(message = "이름은 필수 입력사항 입니다.")
    private String username;
    @NotBlank(message = "이메일은 필수 입력사항 입니다.")
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String email;
    private int gender;
    private int age;
}
