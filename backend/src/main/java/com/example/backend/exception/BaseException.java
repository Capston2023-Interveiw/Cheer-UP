package com.example.backend.exception;

public abstract class BaseException extends RuntimeException{

    public abstract BaseExceptionType getExceptionType();
}