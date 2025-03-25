package com.example.demo.rest.dto.response.error;

import com.example.demo.rest.dto.response.api.ResponseDto;

import com.example.demo.rest.exception.RestBodyNotFoundException;
import com.example.demo.service.exception.ServiceBadValueFormatException;
import com.example.demo.service.exception.ServiceNullPointerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.time.LocalTime;

public class ResponseErrorDtoImpl implements ResponseDto {
    Logger logger = LoggerFactory.getLogger(ResponseErrorDtoImpl.class);

    private final LocalTime time;

    private final String message;

    public static Integer findStatusOfException(Exception e) {
        Integer status = 500;
        if (e.getClass().equals(ServiceBadValueFormatException.class))
            status = ServiceBadValueFormatException.getStatus();

        if (e.getClass().equals(ServiceNullPointerException.class))
            status = ServiceNullPointerException.getStatus();

        if (e.getClass().equals(RestBodyNotFoundException.class))
            status = RestBodyNotFoundException.getStatus();

        return status;
    }

    public static ResponseEntity<ResponseDto> sendErrorWithStatus(Exception exception) {
        return new ResponseEntity<>(new ResponseErrorDtoImpl(LocalTime.now(), exception.getMessage(), exception), HttpStatusCode.valueOf(findStatusOfException(exception)));
    }

    public ResponseErrorDtoImpl(LocalTime time, String message, Exception exception) {
        this.time = time;
        this.message = message;
        logger.error(exception.getMessage(), exception.getCause());
    }

    public LocalTime getTime() {
        return time;
    }

    public String getMessage() {
        return message;
    }


}
