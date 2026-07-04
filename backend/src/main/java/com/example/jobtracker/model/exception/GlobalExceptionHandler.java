package com.example.jobtracker.model.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice// this listens to all controllers for any errors acts as gobal try catch
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)//when a RuntimeException occurs...
    public ResponseEntity<Object> handleNotFound(ResourceNotFoundException ex)
    {
        Map<String,Object> body=new HashMap<>();
        body.put("timeStamp", LocalDateTime.now());
        body.put("message",ex.getMessage());

        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }
}
