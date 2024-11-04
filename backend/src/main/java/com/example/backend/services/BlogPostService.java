package com.example.backend.services;

import com.example.backend.model.BlogPost;

import java.util.List;

public interface BlogPostService  {
    public List<BlogPost> getAllBlogPosts();

    public void savePost(BlogPost BlogPost);

    public BlogPost getPostDetails(Integer id);





}
