package com.example.backend.serviceImpl;

import com.example.backend.model.BlogPost;
import com.example.backend.repositories.BlogPostRepository;
import com.example.backend.services.BlogPostService;
import com.example.backend.tools.SnowflakeIdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BlogPostServiceImpl implements BlogPostService {

    private final BlogPostRepository blogPostRepository;
    private final SnowflakeIdWorker idWorker;


    @Autowired
    public BlogPostServiceImpl(BlogPostRepository blogPostRepository, SnowflakeIdWorker idWorker){
        this.blogPostRepository = blogPostRepository;
        this.idWorker = idWorker;
    }

    @Override
    public List<BlogPost> getAllBlogPosts() {
        return blogPostRepository.findAll();

    }

    @Override
    public void savePost(BlogPost blogPost){
        blogPostRepository.save(blogPost);
    }
    @Override
    public BlogPost getPostDetails(Integer id){
        return blogPostRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));    }

//        或者
//        return blogPostRepository.findById(Long.valueOf(id))
//            .orElse(null); // 或者提供一个默认的 BlogPost 实例

//    或者
//    Optional<BlogPost> postOptional = blogPostRepository.findById(Long.valueOf(id));
//        if (postOptional.isPresent()) {
//            return postOptional.get();
//        } else {
//            throw new RuntimeException("Post not found with id: " + id);
//    }

}
