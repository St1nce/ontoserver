package com.example.demo.service.exception;

public class ServiceNullPointerException extends NullPointerException {

    static Integer status = 401;

    public ServiceNullPointerException() {
    }

    public ServiceNullPointerException(String message) {
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
