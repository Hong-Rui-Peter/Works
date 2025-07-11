package com.groupone.librarysystem.library_backend.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChapterRequest {
    /**
     * id
     */
    @Schema(description = "id")
    private int id;

    /**
     * 封面
     */
    @Schema(description = "封面")
    private String bookIcon;

    /**
     * 名稱
     */
    @Schema(description = "名稱")
    private String bookName;

    /**
     * 章節
     */
    @Schema(description = "書的章節")
    private int chapter_number;

    /**
     * 標籤
     */
    @Schema(description = "標籤")
    private String tag;

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
