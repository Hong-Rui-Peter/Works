package com.groupone.librarysystem.library_backend.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginRequest {
    private String account;
    private String password;
}