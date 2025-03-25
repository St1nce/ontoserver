package com.example.demo.service.exception;

public class ServiceBadValueFormatException extends RuntimeException{
    static Integer status = 400;

    public ServiceBadValueFormatException() {
    }

    public ServiceBadValueFormatException(String message) {
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
