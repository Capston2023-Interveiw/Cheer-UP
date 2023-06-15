package com.example.backend.member.exception;

public abstract class BaseException extends RuntimeException{

    public abstract BaseExceptionType getExceptionType();
}