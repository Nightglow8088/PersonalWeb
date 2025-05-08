package com.example.backend.model;

import lombok.Data;

import java.time.OffsetDateTime;
@Data
public class CommentDTO {
    private Integer id;
    private Integer postId;
    private Integer commenterId;
    private String commenterName;
    private String content;
    private OffsetDateTime createdAt;
    private Integer parentId;
    // getters & setters
}