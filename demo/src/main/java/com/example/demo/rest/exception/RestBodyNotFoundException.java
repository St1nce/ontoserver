package com.example.demo.rest.exception;

import com.example.demo.service.exception.ServiceBadValueFormatException;

public class RestBodyNotFoundException extends RuntimeException {
    static Integer status = 404;

    public RestBodyNotFoundException() {
        super("Тело запроса отсутствует");
    }


    static public String getName() {
        return ServiceBadValueFormatException.class.getName();
    }

    static public Integer getStatus() {
        return status;
    }
}
