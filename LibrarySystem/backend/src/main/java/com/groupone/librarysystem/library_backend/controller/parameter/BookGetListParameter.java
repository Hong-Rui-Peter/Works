package com.groupone.librarysystem.library_backend.controller.parameter;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 查詢-書本一覽表 parameter
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookGetListParameter {

    /**
     * 名稱
     */
    @Schema(description = "關鍵字")
    private String keyword;

    /**
     * 作者
     */
    @Schema(description = "作者")
    private String author;

    /**
     * 標籤
     */
    @Schema(description = "標籤")
    private String tag;

    // 模糊搜尋加工
    public String getKeyword() {

        if (keyword == null) {
            return null;
        }

        return "%" + keyword + "%";
    }

    /**
     * 每頁筆數
     */
    @Schema(description = "每頁筆數")
    private int size = 20;

    /**
     * 跳過筆數
     */
    @Schema(description = "跳過筆數")
    private int skip = 0;
}
