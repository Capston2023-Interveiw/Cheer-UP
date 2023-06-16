<<<<<<< HEAD:backend/src/main/java/com/example/backend/dto/response/ErrorResponse.java
package com.example.backend.dto.response;
=======
package com.example.backend.member.dto.response;
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898:backend/src/main/java/com/example/backend/member/dto/response/ErrorResponse.java

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ErrorResponse {

    private String message;
    private int statusCode;
}