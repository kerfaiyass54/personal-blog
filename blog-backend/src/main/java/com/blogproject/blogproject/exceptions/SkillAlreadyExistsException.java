package com.blogproject.blogproject.exceptions;

public class SkillAlreadyExistsException extends RuntimeException {

    public SkillAlreadyExistsException(String message) {
        super(message);
    }
}