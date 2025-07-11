package com.groupone.librarysystem.library_backend.service.RankService;

import com.groupone.librarysystem.library_backend.controller.parameter.BookGetListParameter;
import com.groupone.librarysystem.library_backend.model.BookResultModel;
import com.groupone.librarysystem.library_backend.model.Rank;

import java.util.List;

public interface RankService {
    /**
     * 寫入-排行榜資料
     * @param id 書本Id
     */
    void setRankData(Integer id);


    /**
     * 查詢-排行榜一覽表
     * @return 排行榜資料
     */
    List<BookResultModel> getBookData();
}
