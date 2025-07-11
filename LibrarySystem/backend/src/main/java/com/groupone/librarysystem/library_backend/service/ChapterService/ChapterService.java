package com.groupone.librarysystem.library_backend.service.ChapterService;

import com.groupone.librarysystem.library_backend.model.ChapterModel;
import com.groupone.librarysystem.library_backend.model.dto.ChapterRequest;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface ChapterService {


    CompletableFuture<List<ChapterModel>> getBookByIdAsync(Integer id);

    ChapterRequest getBookById(Integer id, Integer chapterNumber);
}
