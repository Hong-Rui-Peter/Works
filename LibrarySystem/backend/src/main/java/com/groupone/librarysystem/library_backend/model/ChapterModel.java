package com.groupone.librarysystem.library_backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChapterModel {

    /**
     * id
     */
    @Schema(description = "id")
    private int id;

    /**
     * 章節
     */
    @Schema(description = "書的章節")
    private int chapter_number;

    /**
     * 新建時問
     */
    @Schema(description = "新建時問")
    private String createDate;

    /**
     * 章節內容
     */
    @Schema(description = "章節內容")
    private String content;

    /**
     * 文章名稱
    */
    @Schema(description = "文章名稱")
    private String title;
}
