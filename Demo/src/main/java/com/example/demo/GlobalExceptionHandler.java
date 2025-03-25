package com.example.demo;

import com.example.demo.rest.dto.response.api.ResponseDto;
import com.example.demo.rest.dto.response.error.ResponseErrorDtoImpl;
import com.example.demo.rest.exception.RestBodyNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ResponseDto> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        // Возвращаем кастомное сообщение об ошибке и статусный код HTTP 400 Bad Request
        return ResponseErrorDtoImpl.sendErrorWithStatus(new RestBodyNotFoundException());
    }
}
