package com.example.demo.rest.dto.response.success;

import com.example.demo.rest.dto.response.api.ResponseDto;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.time.LocalTime;

public class ResponseSuccessDto implements ResponseDto {

    private LocalTime time;

    private String message;

    private Object object;

    public static ResponseEntity<ResponseDto> sendResponse(Object object) {
        return new ResponseEntity<>(new ResponseSuccessDto(LocalTime.now(), "Запрос завершился успешно.", object), HttpStatusCode.valueOf(200)) ;
    }

    public static ResponseEntity<ResponseDto> sendResponse() {
        return new ResponseEntity<>(new ResponseSuccessDto(LocalTime.now(), "Запрос завершился успешно."), HttpStatusCode.valueOf(200)) ;
    }

    public ResponseSuccessDto(LocalTime time, String message, Object object) {
        this.time = time;
        this.message = message;
        this.object = object;
    }

    public ResponseSuccessDto(LocalTime time, String message) {
        this.time = time;
        this.message = message;
    }

    public LocalTime getTime() {
        return time;
    }

    public String getMessage() {
        return message;
    }

    public Object getObject() {
        return object;
    }
}
