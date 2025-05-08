package com.example.backend.services;

import com.example.backend.model.Comment;

import java.util.List;

public interface CommentService {
    public List<Comment> listComments(Integer postId);

    public Comment addComment(Integer postId, Integer userId, String content, Integer parentId) ;
}
