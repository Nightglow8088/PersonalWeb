package com.example.backend.model;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Set;

@Data


public class BlogPostDTO {

    private Integer id;

    private String title;

    private String bodyText;

    private Integer posterId;

    private String posterName;

    private String summary;

    // 新增两个字段
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    private Set<String> tags;
}
