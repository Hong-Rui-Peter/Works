package com.groupone.librarysystem.library_backend.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rank {
    /**
     * 排行榜 ID
     */
    @Schema(description = "id")
    private Integer id;

    /**
     * 次數
     */
    @Schema(description = "次數")
    private Integer count;
}
