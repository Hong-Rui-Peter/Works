package com.groupone.librarysystem.library_backend.mapper;

import com.groupone.librarysystem.library_backend.model.ChapterModel;
import com.groupone.librarysystem.library_backend.model.dto.ChapterRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Mapper
public interface ChapterMapper {
    List<ChapterModel> getBookByContent(@Param("id") int id);

    ChapterRequest getBookContentById(@Param("id") int id, @Param("chapterNumber") int chapterNumber );
}
