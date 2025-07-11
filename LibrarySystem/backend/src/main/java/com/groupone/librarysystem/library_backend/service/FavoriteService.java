package com.groupone.librarysystem.library_backend.service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import com.groupone.librarysystem.library_backend.model.FavoriteModel;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface FavoriteService {
    void addFavorite(String id, String account);
    void dropFavorite(String id, String account);
    List<FavoriteModel> getBookData(String account);
}