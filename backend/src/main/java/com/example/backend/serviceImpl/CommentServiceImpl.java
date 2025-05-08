package com.example.backend.serviceImpl;

import com.example.backend.model.BlogPost;
import com.example.backend.model.Comment;
import com.example.backend.model.Users;
import com.example.backend.repositories.CommentRepository;
import com.example.backend.services.CommentService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository repo;
    public CommentServiceImpl(CommentRepository repo) {
        this.repo = repo;
    }

    public List<Comment> listComments(Integer postId) {
        return repo.findByPostIdOrderByCreatedAtAsc(postId);
    }

    public Comment addComment(Integer postId, Integer userId, String content, Integer parentId) {
        Comment c = new Comment();
        c.setPost(new BlogPost(postId));            // 只需有 id
        c.setCommenter(new Users(userId));    // 只需有 id
        c.setContent(content);
        if (parentId != null) {
            c.setParent(new Comment(parentId));
        }
        return repo.save(c);
    }
}
