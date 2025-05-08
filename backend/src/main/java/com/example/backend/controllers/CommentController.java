package com.example.backend.controllers;

import com.example.backend.model.*;
import com.example.backend.response.Response;
import com.example.backend.services.CommentService;
import com.example.backend.services.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;
    private final UserAccountService userAccountService;
    @Autowired
    public CommentController(CommentService commentService, UserAccountService userAccountService) {
        this.commentService = commentService;
        this.userAccountService = userAccountService;
    }

    /**
     * 获取指定文章的评论列表，对外公开，无需登录
     * GET /api/comments/{postId}
     */
    @GetMapping("/getComments")
    public ResponseEntity<Response<List<CommentDTO>>> listComments(
            @RequestParam Integer postId
    ) {
        List<CommentDTO> list = commentService
                .listComments(postId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(
                Response.ok(list)
        );
    }

    /**
     * 发布一条评论，需要登录
     * POST /api/comments
     * Body: AddCommentDTO { postId, content, parentId }
     */
    @PostMapping("/addComments")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Response<CommentDTO>> addComment(
            @RequestBody AddCommentDTO req,
            @AuthenticationPrincipal UserDetails userDetails
    ) {

        // userDetails.getUsername() 就是你的 mailAddress（或 username）
        String mail = userDetails.getUsername();
        System.out.println("mail:   "+mail);
        // 从数据库加载你的实体 Users
        Users user = userAccountService.findByMailAddress(mail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment saved = commentService.addComment(
                req.getPostId(),
                user.getId(),
                req.getContent(),
                req.getParentId()
        );

        return ResponseEntity.ok(
                Response.ok(toDto(saved))
        );
    }

    // === private helper: 实体转 DTO ===
    private CommentDTO toDto(Comment c) {
        CommentDTO d = new CommentDTO();
        d.setId(c.getId());
        d.setPostId(c.getPost().getId());
        d.setCommenterId(c.getCommenter().getId());
        d.setCommenterName(c.getCommenter().getName());
        d.setContent(c.getContent());
        d.setCreatedAt(c.getCreatedAt());
        d.setParentId(c.getParent() != null ? c.getParent().getId() : null);
        return d;
    }
}