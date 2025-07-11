package com.groupone.librarysystem.library_backend.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRegisterRequest {
    private String account;
    private String password;
    private String email;
    private String name;
}
