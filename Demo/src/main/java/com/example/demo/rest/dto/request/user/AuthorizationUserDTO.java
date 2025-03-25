package com.example.demo.rest.dto.request.user;

public class AuthorizationUserDTO {
    private String mail;
    private String password;


    public AuthorizationUserDTO(String mail, String password) {
        this.mail = mail;
        this.password = password;
    }

    public AuthorizationUserDTO() {
    }

    public String getMail() {
        return mail;
    }

    public String getPassword() {
        return password;
    }

}
