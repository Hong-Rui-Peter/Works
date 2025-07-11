package com.groupone.librarysystem.library_backend.repository;

import com.groupone.librarysystem.library_backend.controller.parameter.BookGetListParameter;
import com.groupone.librarysystem.library_backend.model.BookResultModel;
import com.groupone.librarysystem.library_backend.model.condition.BookGetListCondition;

import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * 查詢-書本 Repository Interface
 */
public interface BookRepository {

    /**
     * 查詢-書本
     * @param id 書本Id
     * @param account 使用者
     * @return 書本資料
     */
    CompletableFuture<BookResultModel> getAsync(int id, String account);

    /**
     * 查詢-書本一覽表
     * @param condition 查詢條件
     * @return 書本資料
     */
    CompletableFuture<List<BookResultModel>> getListAsync(BookGetListCondition condition);
}
