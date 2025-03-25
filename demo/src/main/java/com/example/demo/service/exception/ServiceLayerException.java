package com.example.demo.service.exception;

public class ServiceLayerException extends RuntimeException {

    Integer status;

    public ServiceLayerException(String message) {
        super(message);
    }

    public Integer getStatus() {
        return status;
    }
}
