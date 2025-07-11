package com.groupone.librarysystem.library_backend.repository;

import com.groupone.librarysystem.library_backend.controller.parameter.BookGetListParameter;
import com.groupone.librarysystem.library_backend.model.BookResultModel;
import com.groupone.librarysystem.library_backend.model.condition.BookGetListCondition;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.BeanMapper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * 查詢-書本 Repository
 */
@Repository
public class BookRepositoryImpl implements BookRepository {

    private final Jdbi jdbi;
    private final ExecutorService dbExecutor = Executors.newFixedThreadPool(10);

    /**
     * 建構式
     *
     * @param jdbi jdbi
     */
    public BookRepositoryImpl(Jdbi jdbi) {

        this.jdbi = jdbi;
    }

    /**
     * 查詢-書本
     *
     * @param id 書本Id
     * @param account 使用者
     * @return 書本資料
     */
    @Async
    public CompletableFuture<BookResultModel> getAsync(int id, String account) {

        try (var handle = this.jdbi.open()) {

            var sql = """
                    SELECT b.id,
                           b.book_name bookName,
                           b.book_text bookText,
                           b.author author,
                           b.book_icon bookIcon,
                           b.tag,
                           b.created_at createDate,
                           CASE
                           	    WHEN :account = "" THEN 0
                           	    WHEN f.update_time IS NULL THEN 1
                           	    ELSE 2
                           END isLike,
                           IFNULL(r.count, 0) count
                      FROM book b
                      LEFT JOIN favorite f
                        ON b.id = f.id
                       AND f.account = :account
                      LEFT JOIN `rank` r
                        ON b.id = r.id
                     WHERE b.id = :id
                    """;

            var dateModel = handle.createQuery(sql)
                                  .bind("id", id)
                                  .bind("account", account)
                                  .registerRowMapper(BeanMapper.factory(BookResultModel.class))
                                  .mapTo(BookResultModel.class)
                                  .findOne()
                                  .orElse(new BookResultModel());

            return CompletableFuture.completedFuture(dateModel);
        }
    }

    /**
     * 查詢-書本一覽表
     *
     * @param condition 查詢條件
     * @return 書本資料
     */
    @Async
    public CompletableFuture<List<BookResultModel>> getListAsync(BookGetListCondition condition) {

        try (var handle = this.jdbi.open()) {

            var sql = """
                    SELECT b.id,
                           b.book_name bookName,
                           b.book_text bookText,
                           b.author author,
                           b.book_icon bookIcon,
                           b.tag,
                           b.created_at createDate,
                           CASE
                           	    WHEN :account = "" THEN 0
                           	    WHEN f.update_time IS NULL THEN 1
                           	    ELSE 2
                           END isLike,
                           IFNULL(r.count, 0) count
                      FROM book b
                      LEFT JOIN favorite f
                        ON b.id = f.id
                       AND f.account = :account
                      LEFT JOIN `rank` r
                        ON b.id = r.id
                     WHERE (:keyword IS NULL OR (book_name LIKE :keyword OR author LIKE :keyword))
                       AND (:author IS NULL OR author = :author)
                       AND (:tag IS NULL OR tag = :tag)
                     ORDER BY b.id
                     LIMIT :size OFFSET :skip;
                    """;

            var dateModel = handle.createQuery(sql)
                                  .bindBean(condition)
                                  .registerRowMapper(BeanMapper.factory(BookResultModel.class))
                                  .mapTo(BookResultModel.class)
                                  .list();

            return CompletableFuture.completedFuture(dateModel);
        }
    }
}
