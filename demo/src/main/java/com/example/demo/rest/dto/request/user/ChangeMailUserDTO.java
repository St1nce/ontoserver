package com.example.demo.rest.dto.request.user;

import java.util.UUID;

public class ChangeMailUserDTO {

    private String id;

    private String mail;


    public ChangeMailUserDTO() {
    }

    public ChangeMailUserDTO(String id, String mail) {
        this.id = id;
        this.mail = mail;
    }

    public String getId() {
        return id;
    }

    public String getMail() {
        return mail;
    }
}
