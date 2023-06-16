<<<<<<< HEAD:backend/src/main/java/com/example/backend/dto/request/MemberLoginRequest.java
package com.example.backend.dto.request;
=======
package com.example.backend.member.dto.request;
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898:backend/src/main/java/com/example/backend/member/dto/request/MemberLoginRequest.java

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
<<<<<<< HEAD:backend/src/main/java/com/example/backend/dto/request/MemberLoginRequest.java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
=======
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898:backend/src/main/java/com/example/backend/member/dto/request/MemberLoginRequest.java
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
public class MemberLoginRequest {

<<<<<<< HEAD:backend/src/main/java/com/example/backend/dto/request/MemberLoginRequest.java
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
=======
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898:backend/src/main/java/com/example/backend/member/dto/request/MemberLoginRequest.java
    private String accountId;
    private String password;

    public UsernamePasswordAuthenticationToken toAuthentication() {
<<<<<<< HEAD:backend/src/main/java/com/example/backend/dto/request/MemberLoginRequest.java
        logger.info(String.valueOf(new UsernamePasswordAuthenticationToken(accountId, password)));
=======
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898:backend/src/main/java/com/example/backend/member/dto/request/MemberLoginRequest.java
        return new UsernamePasswordAuthenticationToken(accountId, password);
    }
}
