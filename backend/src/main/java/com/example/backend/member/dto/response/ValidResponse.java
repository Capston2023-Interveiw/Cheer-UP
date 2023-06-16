<<<<<<< HEAD:backend/src/main/java/com/example/backend/dto/response/ValidResponse.java
package com.example.backend.dto.response;
=======
package com.example.backend.member.dto.response;
>>>>>>> a5a39a2fc7489df9b98673cab6ae48b247b79898:backend/src/main/java/com/example/backend/member/dto/response/ValidResponse.java

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ValidResponse {

    private List<String> messages;
    private int statusCode;
}
