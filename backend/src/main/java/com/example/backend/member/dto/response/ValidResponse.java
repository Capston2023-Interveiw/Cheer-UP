package com.example.backend.member.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ValidResponse {

    private List<String> messages;
    private int statusCode;
}
