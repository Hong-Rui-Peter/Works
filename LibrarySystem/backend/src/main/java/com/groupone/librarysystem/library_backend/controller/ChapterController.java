package com.groupone.librarysystem.library_backend.controller;

import com.groupone.librarysystem.library_backend.model.ChapterModel;
import com.groupone.librarysystem.library_backend.model.dto.ChapterRequest;
import com.groupone.librarysystem.library_backend.service.ChapterService.ChapterService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api")
public class ChapterController {
    @Autowired
    private ChapterService chapterService;

    @Operation(summary = "讀取小說資料")
    @GetMapping("/chapter/{id}")
    public CompletableFuture<List<ChapterModel>> getChapterById(@PathVariable("id") Integer id) {
        var result = this.chapterService.getBookByIdAsync(id);
        return result;
    }

    @Operation(summary = "讀取小說單頁章節")
    @GetMapping("/chapter/{id}/{chapterNumber}")
    public ChapterRequest getChapterById(@PathVariable("id")Integer id, @PathVariable("chapterNumber")Integer chapterNumber) {
        var result = this.chapterService.getBookById(id, chapterNumber);
        return result;
    }
}
