package com.example.demo.rest.dto.request.user;

import java.util.UUID;

public class ChangePasswordUserDTO {

    private String id;

    private String newPassword;

    private String oldPassword;

    public ChangePasswordUserDTO() {
    }

    public ChangePasswordUserDTO(String id, String newPassword, String oldPassword) {
        this.id = id;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
    }

    public String getId() {
        return id;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }
}
