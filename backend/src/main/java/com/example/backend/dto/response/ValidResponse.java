package com.example.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ValidResponse {

    private List<String> messages;
    private int statusCode;
}
