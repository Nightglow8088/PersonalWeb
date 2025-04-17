package com.example.backend.services;

import com.example.backend.model.BlogPost;
import com.example.backend.model.BlogPostDTO;
import com.example.backend.model.BlogPostTag;
import jakarta.transaction.Transactional;

import java.util.List;

@Transactional
public interface BlogPostService  {
    public List<BlogPost> getAllBlogPosts();

    public void savePost(BlogPost BlogPost);

    public BlogPost getPostDetails(Integer id);

//    public BlogPost savePostTest(BlogPostDTO BlogPostDTO);

    public BlogPost getBlogPostWithTags(Integer id);


    public List<BlogPostTag> getAllTags();

    public List<BlogPostTag> createTags(List<String> tags);

    //中间的delete我给注释了 这个接口少用
    public void removeTags(List<String> tags);



    //下面是gpt给的答案
    BlogPostDTO create(BlogPostDTO dto);
    BlogPostDTO update(Integer id, BlogPostDTO dto);
    void delete(Integer id);
    BlogPostDTO getById(Integer id);
    List<BlogPostDTO> getAll();







}
