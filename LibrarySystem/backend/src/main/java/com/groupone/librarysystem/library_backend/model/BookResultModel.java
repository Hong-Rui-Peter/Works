package com.groupone.librarysystem.library_backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 查詢-書本 ResultModel
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookResultModel {

    /**
     * id
     */
    @Schema(description = "id")
    private int id;

    /**
     * 名稱
     */
    @Schema(description = "名稱")
    private String bookName;

    /**
     * 內容
     */
    @Schema(description = "內容")
    private String bookText;

    /**
     * 作者
     */
    @Schema(description = "作者")
    private String author;

    /**
     * 封面
     */
    @Schema(description = "封面")
    private String bookIcon;

    /**
     * 標籤
     */
    @Schema(description = "標籤")
    private String tag;

    /**
     * 我的最愛 (1:沒登入 2:否 3:是)
     */
    @Schema(description = "我的最愛")
    private Integer isLike;

    /**
     * 點擊次數
     */
    @Schema(description = "點擊次數")
    private Integer count;

    /**
     * 新建時問
     */
    @Schema(description = "新建時問")
    private String createDate;
}
