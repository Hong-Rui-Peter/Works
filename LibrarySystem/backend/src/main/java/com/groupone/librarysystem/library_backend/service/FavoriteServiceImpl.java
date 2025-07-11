package com.groupone.librarysystem.library_backend.service;

import com.groupone.librarysystem.library_backend.mapper.FavoriteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.groupone.librarysystem.library_backend.model.FavoriteModel;
import java.util.List;
import java.util.concurrent.CompletableFuture;


@Service
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteMapper favoriteMapper;

    public FavoriteServiceImpl(FavoriteMapper favoriteMapper) {
        this.favoriteMapper = favoriteMapper;
    }

    @Override
    public void addFavorite(String id, String account) {
        favoriteMapper.setFavoData(id, account);
    }

    @Override
    public void dropFavorite(String id, String account) {
        favoriteMapper.dropFavoData(id, account);
    }

    @Override
    public List<FavoriteModel> getBookData(String account) {
        return favoriteMapper.getBookData(account);
    }
}

