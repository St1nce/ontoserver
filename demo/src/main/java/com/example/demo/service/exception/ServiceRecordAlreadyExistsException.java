package com.example.demo.service.exception;

public class ServiceRecordAlreadyExistsException extends RuntimeException {

    static Integer status = 604;

    public ServiceRecordAlreadyExistsException() {
    }

    public ServiceRecordAlreadyExistsException(String message) {
        super(message);
    }

    static public String getName()
    {
        return ServiceRecordAlreadyExistsException.class.getName();
    }

    static public Integer getStatus()
    {
        return status;
    }
}
