package com.groupone.librarysystem.library_backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 查詢-我的最愛
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteModel {
    private String id;
    private String account;

    private String bookName;
    private String bookText;
    private String author;
    private String bookIcon;
    private String tag;
}