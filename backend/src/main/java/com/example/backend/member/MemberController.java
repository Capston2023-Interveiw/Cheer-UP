package com.example.backend.member;

<<<<<<< HEAD:backend/src/main/java/com/example/backend/controller/MemberController.java
import com.example.backend.dto.TokenInfo;
import com.example.backend.dto.request.MemberLoginRequest;
import com.example.backend.dto.request.MemberRequest;
import com.example.backend.dto.response.MemberResponse;
import com.example.backend.service.MemberService;
=======
import com.example.backend.member.dto.TokenInfo;
import com.example.backend.member.dto.request.MemberLoginRequest;
import com.example.backend.member.dto.request.MemberRequest;
import com.example.backend.member.dto.response.MemberResponse;
import com.example.backend.member.service.MemberService;
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898:backend/src/main/java/com/example/backend/member/MemberController.java
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/account")
    public ResponseEntity<Void> create(@Validated @RequestBody MemberRequest dto) throws Exception  {
        memberService.create(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }

    @PostMapping("/login")
    public TokenInfo login(@RequestBody MemberLoginRequest dto) {
        return memberService.login(dto);
    }

    @GetMapping("{id}")
    public ResponseEntity<MemberResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(memberService.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<MemberResponse>> getAll() {
        return ResponseEntity.ok(memberService.getAll());
    }
}
