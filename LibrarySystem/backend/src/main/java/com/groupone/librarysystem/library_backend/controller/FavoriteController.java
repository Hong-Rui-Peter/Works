package com.groupone.librarysystem.library_backend.controller;


import com.groupone.librarysystem.library_backend.model.FavoriteModel;
import com.groupone.librarysystem.library_backend.service.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @PostMapping("/favorite/{account}/{id}")
    public void addFavorite(@PathVariable String account,
                            @PathVariable String id) {
        favoriteService.addFavorite(id, account);
    }

    @DeleteMapping("/favorite/{account}/{id}")
    public void dropFavorite(@PathVariable String account,
                             @PathVariable String id) {
        favoriteService.dropFavorite(id, account);
    }

    @GetMapping("/favorite/{account}")
    public List<FavoriteModel> getFavorite(@PathVariable String account) {
        return favoriteService.getBookData(account);
    }
}

