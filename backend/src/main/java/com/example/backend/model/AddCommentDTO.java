package com.example.backend.model;

import lombok.Data;

@Data
public class AddCommentDTO {
    private Integer postId;
    private String content;
    private Integer parentId;  // 可空

    // getters & setters
}