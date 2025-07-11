package com.groupone.librarysystem.library_backend.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginResponse {
    private Boolean status;
    private String msg;
}