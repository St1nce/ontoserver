package com.example.demo.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

/**
 *
 */
@Entity
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    @Getter
    private UUID id;


    @Getter
    private String password;    // хеш-значение пароля 60 символов

    @Getter
    private String mail;

    @Getter
    @Setter
    private Boolean mailConfirmation;

    public User(UUID id, String mail, String password) {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.mailConfirmation = false;
    }

    public User(String mail, String password) {
        this.id = null;
        this.mail = mail;
        this.password = password;
        this.mailConfirmation = false;
    }
}
