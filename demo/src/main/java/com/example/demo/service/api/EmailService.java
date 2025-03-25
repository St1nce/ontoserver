package com.example.demo.service.api;

public interface EmailService {

    void sendMessage(String to, String subject, String htmlText) throws Exception;
}
