package com.example.demo.rest.dto.request.user;

import com.example.demo.db.entity.User;

import java.util.UUID;

public class RegistrationUserDTO {

    private UUID id;
    private String password;

    private String mail;

    public RegistrationUserDTO() {
    }

    public RegistrationUserDTO(String password, String mail) {
        this.password = password;
        this.mail = mail;
    }

    public RegistrationUserDTO(User user) {
        this.id = user.getId();
        this.password = "";
        this.mail = user.getMail();
    }

    public String getPassword() {
        return password;
    }

    public String getMail() {
        return mail;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
