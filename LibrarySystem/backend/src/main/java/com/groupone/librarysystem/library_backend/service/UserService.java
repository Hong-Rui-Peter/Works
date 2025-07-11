package com.groupone.librarysystem.library_backend.service;

import com.groupone.librarysystem.library_backend.model.dto.UserLoginRequest;
import com.groupone.librarysystem.library_backend.model.dto.UserLoginResponse;
import com.groupone.librarysystem.library_backend.model.dto.UserRegisterRequest;
import com.groupone.librarysystem.library_backend.model.dto.UserRegisterResponse;
import com.groupone.librarysystem.library_backend.model.entity.User;
import com.groupone.librarysystem.library_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserRegisterResponse register(UserRegisterRequest request) {
        UserRegisterResponse response = new UserRegisterResponse();

        if (userRepository.existsById(request.getAccount())) {
            response.setStatus(false);
            response.setMsg("帳號已存在");
            return response;
        }

        User user = new User();
        user.setAccount(request.getAccount());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setName(request.getName());
        user.setCreateTime(LocalDateTime.now());

        userRepository.save(user);

        response.setStatus(true);
        response.setMsg("註冊成功");

        return response;
    }

    public UserLoginResponse login(UserLoginRequest request) {
        UserLoginResponse response = new UserLoginResponse();
        Optional<User> optionalUser = userRepository.findById(request.getAccount());


        if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(request.getPassword())) {
            response.setStatus(true);
            response.setMsg("登入成功");
        } else {
            response.setStatus(false);
            response.setMsg("帳號密碼錯誤");
        }

        return response;
    }
}