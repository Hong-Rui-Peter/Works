package com.groupone.librarysystem.library_backend.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User {
    @Id
    private String account;

    private String password;
    private String email;
    private String name;

    @Column(name = "create_time")
    private LocalDateTime createTime;
}