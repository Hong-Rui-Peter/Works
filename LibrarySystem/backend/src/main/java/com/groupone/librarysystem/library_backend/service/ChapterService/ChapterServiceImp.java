package com.groupone.librarysystem.library_backend.service.ChapterService;

import com.groupone.librarysystem.library_backend.mapper.ChapterMapper;
import com.groupone.librarysystem.library_backend.model.ChapterModel;
import com.groupone.librarysystem.library_backend.model.dto.ChapterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class ChapterServiceImp implements ChapterService {

    @Autowired
    ChapterMapper chapterMapper;
    @Override
    public CompletableFuture<List<ChapterModel>> getBookByIdAsync(Integer id) {
        var result =  CompletableFuture.supplyAsync(() -> this.chapterMapper.getBookByContent(id));
        return result;
    }

    @Override
    public ChapterRequest getBookById(Integer id, Integer chapterNumber) {
        var result = this.chapterMapper.getBookContentById(id, chapterNumber);
        return result;
    }
}
