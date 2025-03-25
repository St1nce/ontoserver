package com.example.demo.service.exception;

import java.util.function.Supplier;

public class ServiceNotFoundException extends RuntimeException {

    static Integer status = 404;

    public ServiceNotFoundException() {
    }

    public ServiceNotFoundException(String message) {
        super(message);
    }


    static public String getName()
    {
        return ServiceBadValueFormatException.class.getName();
    }

    static public Integer getStatus()
    {
        return status;
    }
}
