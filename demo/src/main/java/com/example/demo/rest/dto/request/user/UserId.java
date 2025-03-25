package com.example.demo.rest.dto.request.user;

import java.util.UUID;

public class UserId {
    private UUID userId;

    public UserId() {
    }

    public UserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getUserId() {
        return userId;
    }
}
