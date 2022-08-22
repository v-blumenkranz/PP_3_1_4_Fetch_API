package ru.kata.spring.boot_security.demo.exception_handling;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandling {

    @ExceptionHandler
    public ResponseEntity<UserBadData> handleException(NoSuchUserException exception) {
        UserBadData badData = new UserBadData();
        badData.setInfo(exception.getMessage());
        return new ResponseEntity<>(badData, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<UserBadData> handleException(Exception exception) {
        UserBadData badData = new UserBadData();
        badData.setInfo(exception.getMessage());
        return new ResponseEntity<>(badData, HttpStatus.BAD_REQUEST);
    }
}
