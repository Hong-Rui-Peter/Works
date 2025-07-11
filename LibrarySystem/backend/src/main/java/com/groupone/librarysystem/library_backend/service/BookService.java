package com.groupone.librarysystem.library_backend.service;

import com.groupone.librarysystem.library_backend.controller.parameter.BookGetListParameter;
import com.groupone.librarysystem.library_backend.model.BookResultModel;

import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * 查詢-書本 Service Interface
 */
public interface BookService {

    /**
     * 查詢-書本
     * @param id 書本Id
     * @param account 使用者
     * @return 書本資料
     */
    CompletableFuture<BookResultModel> getAsync(int id, String account);

    /**
     * 查詢-書本一覽表
     * @param infoModel 查詢條件
     * @param account 使用者
     * @return 書本資料
     */
    CompletableFuture<List<BookResultModel>> getListAsync(BookGetListParameter infoModel, String account);
}
