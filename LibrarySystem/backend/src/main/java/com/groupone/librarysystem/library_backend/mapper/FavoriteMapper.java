package com.groupone.librarysystem.library_backend.mapper;


import com.groupone.librarysystem.library_backend.model.FavoriteModel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FavoriteMapper {

    int setFavoData(@Param("id") String id, @Param("account") String account);

    int dropFavoData(@Param("id") String id, @Param("account") String account);

    List<FavoriteModel> getBookData(@Param("account") String account);

}
