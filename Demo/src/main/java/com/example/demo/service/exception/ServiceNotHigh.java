package com.example.demo.service.exception;

public class ServiceNotHigh extends RuntimeException {

    static Integer status = 606;

    public ServiceNotHigh() {
    }

    public ServiceNotHigh(String message) {
        super(message);
    }

    static public String getName()
    {
        return ServiceNotHigh.class.getName();
    }

    static public Integer getStatus()
    {
        return status;
    }
}
