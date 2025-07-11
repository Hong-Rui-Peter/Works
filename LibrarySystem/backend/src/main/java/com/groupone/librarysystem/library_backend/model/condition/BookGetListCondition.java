package com.groupone.librarysystem.library_backend.model.condition;

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
public class BookGetListCondition {

    /**
     * 名稱
     */
    private String keyword;

    /**
     * 作者
     */
    private String author;

    /**
     * 標籤
     */
    private String tag;

    /**
     * 使用者
     */
    private String account;

    /**
     * 每頁筆數
     */
    private int size = 20;

    /**
     * 跳過筆數
     */
    private int skip = 0;
}
