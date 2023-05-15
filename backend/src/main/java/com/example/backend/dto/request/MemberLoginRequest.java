package com.example.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class MemberLoginRequest {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private String accountId;
    private String password;

    public UsernamePasswordAuthenticationToken toAuthentication() {
        logger.info(String.valueOf(new UsernamePasswordAuthenticationToken(accountId, password)));
        return new UsernamePasswordAuthenticationToken(accountId, password);
    }
}
