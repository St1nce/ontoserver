package com.example.demo.service.exception;

public class ServiceNotEqual extends RuntimeException{
    static Integer status = 605;

    public ServiceNotEqual() {
    }

    public ServiceNotEqual(String message) {
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
