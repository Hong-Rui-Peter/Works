package com.groupone.librarysystem.library_backend.service;

import com.groupone.librarysystem.library_backend.controller.parameter.BookGetListParameter;
import com.groupone.librarysystem.library_backend.model.BookResultModel;
import com.groupone.librarysystem.library_backend.model.condition.BookGetListCondition;
import com.groupone.librarysystem.library_backend.repository.BookRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

/**
 * 查詢-書本
 */
@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    /**
     * 建構式
     * @param bookRepository 查詢-書本 Repository
     */
    public BookServiceImpl(BookRepository bookRepository) {

        this.bookRepository = bookRepository;
    }

    /**
     * 查詢-書本
     * @param id 書本Id
     * @param account 使用者
     * @return 書本資料
     */
    public CompletableFuture<BookResultModel> getAsync(int id, String account){

        account = (account == null) ? "" : account;

        var result = this.bookRepository.getAsync(id, account);

        return  result;
    }

    /**
     * 查詢-書本一覽表
     * @param infoModel 查詢條件
     * @param account 使用者
     * @return 書本資料
     */
    public CompletableFuture<List<BookResultModel>> getListAsync(BookGetListParameter infoModel, String account){

        infoModel = Objects.requireNonNullElse(infoModel, new BookGetListParameter());

        var mapper = new ModelMapper();

        var condition = mapper.map(infoModel, BookGetListCondition.class);

        condition.setAccount(Objects.requireNonNullElse(account, ""));

        var result = this.bookRepository.getListAsync(condition);

        return result;
    }
}
