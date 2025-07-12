package com.groupone.librarysystem.library_backend.controller;

import com.groupone.librarysystem.library_backend.model.BookResultModel;
import com.groupone.librarysystem.library_backend.service.RankService.RankService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;


@Slf4j
@RestController
@RequestMapping("/api")
public class RankControllor {
    /**
     * 建構式
     * @param rankService
     */
     @Autowired
    private RankService rankService;

     /**
     * @param id 書本Id
     * */
    @Operation(summary = "寫入評分資料")
     @PostMapping("/rank/{id}")
     public ResponseEntity<String> setRnakData(@PathVariable Integer id) {
        try{
            rankService.setRankData(id);
            return ResponseEntity.ok("更新成功！");
        }catch (Exception e){
            log.error("排行榜更新失敗，ID=" + id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("錯誤：" + e.getClass().getSimpleName() + " - " + e.getMessage());
        }
    }

    /**
     * 查詢-排行榜一覽表
     * @return 排行榜資料
     */
    @Operation(summary = "讀取排行榜")
    @GetMapping("/rank")
    public List<BookResultModel> getRankData(HttpSession session) {
        var account = (String)session.getAttribute("user");
         var result = rankService.getBookData(account);
         return  result;
    }
}
