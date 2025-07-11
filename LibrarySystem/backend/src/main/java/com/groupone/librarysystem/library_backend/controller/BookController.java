package com.groupone.librarysystem.library_backend.controller;

import com.groupone.librarysystem.library_backend.controller.parameter.BookGetListParameter;
import com.groupone.librarysystem.library_backend.model.BookResultModel;
import com.groupone.librarysystem.library_backend.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * 查詢-書本 Controller
 */
@RestController
@RequestMapping("/api")
public class BookController {

    private final BookService bookService;

    /**
     * 建構式
     * @param bookService 查詢-書本 Service
     */
    public BookController(BookService bookService) {

        this.bookService = bookService;
    }

    /**
     * 查詢-書本
     * @param id 書本Id
     * @return 書本資料
     */
    @Operation(summary = "查詢-書本")
    @GetMapping("/book/{id}")
    public CompletableFuture<BookResultModel> Get(@Parameter(description = "書本 ID") @PathVariable int id, HttpSession session){

        var account = (String)session.getAttribute("user");

        var result = this.bookService.getAsync(id, account);

        return  result;
    }

    /**
     * 查詢-書本一覽表
     * @param parameter 查詢條件
     * @return 書本資料
     */
    @Operation(summary = "查詢-書本一覽表")
    @GetMapping("/book")
    public CompletableFuture<List<BookResultModel>> GetList(@ModelAttribute BookGetListParameter parameter, HttpSession session){

        var account = (String)session.getAttribute("user");

        var result = this.bookService.getListAsync(parameter, account);

        return result;
    }
}
