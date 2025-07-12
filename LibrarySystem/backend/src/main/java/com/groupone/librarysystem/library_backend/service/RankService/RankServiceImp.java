package com.groupone.librarysystem.library_backend.service.RankService;

import com.groupone.librarysystem.library_backend.controller.parameter.BookGetListParameter;
import com.groupone.librarysystem.library_backend.mapper.RankMapper;
import com.groupone.librarysystem.library_backend.model.BookResultModel;
import com.groupone.librarysystem.library_backend.model.Rank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class RankServiceImp  implements RankService{

    @Autowired
    RankMapper rankMapper;


    /**
     * 查詢-書本
     * @param id 書本Id
     * @return 書本資料
     */
    @Override
    public void setRankData(Integer id) {
        // 先檢查 id 是否為 null
        if (id == null) {
            return; // 如果 id 是 null，直接返回 null
        }

        // 取得 Rank 資料
        List<Rank> randData = rankMapper.getRankData();


        // 確保資料存在，並檢查 id 是否匹配
        for (Rank rank : randData) {
            if (id.equals(rank.getId())) {
                 rankMapper.UpdateRankData(id);
                 return;
            }
        }
        rankMapper.setRankData(id, 1);
    }


    /**
     * 查詢-書本排行榜資料
     * @return 排行榜資料
     */
    @Override
    public List<BookResultModel> getBookData(String account) {
        try {
            String safeAccount = (account == null) ? "" : account;
            List<BookResultModel> result = rankMapper.getBookData(safeAccount);
            return result;
        } catch (Exception e) {
            // 可選：使用 Logger 代替 System.out
            System.err.println("Error retrieving book data: " + e.getMessage());
            e.printStackTrace();
            return Collections.emptyList(); // 避免回傳 null，使用空集合更安全
        }
    }
}
