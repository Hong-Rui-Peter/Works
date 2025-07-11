package com.groupone.librarysystem.library_backend.repository;

import com.groupone.librarysystem.library_backend.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {}