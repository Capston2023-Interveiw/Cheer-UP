package com.example.backend.exception;

import com.example.backend.dto.response.ErrorResponse;
import com.example.backend.dto.response.ValidResponse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
@Slf4j
public class ExceptionAdvice {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> handleBaseEx(BaseException exception){
        ErrorResponse errorResponse = ErrorResponse.builder()
                .message(exception.getExceptionType().getErrorMessage())
                .statusCode(exception.getExceptionType().getErrorCode())
                .build();

        return ResponseEntity
                .status(exception.getExceptionType().getErrorCode())
                .body(errorResponse);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class) // 유효성 검사 실패 시 발생하는 예외를 처리
    protected ResponseEntity<ValidResponse> handleException(MethodArgumentNotValidException e) {
        List<ObjectError> allErrors = e.getBindingResult().getAllErrors();
        List<String> messages = allErrors.stream().map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toList());
        ValidResponse errorResponse = ValidResponse.builder()
                .statusCode(400)
                .messages(messages)
                .build();

        return ResponseEntity.badRequest().body(errorResponse);
    }
}

