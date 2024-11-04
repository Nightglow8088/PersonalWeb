package com.example.backend.controllers;

import com.example.backend.model.BlogPost;
import com.example.backend.response.Response;
import com.example.backend.services.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/BlogController")
public class BlogController {
    private final BlogPostService blogPostService;

    @Autowired
    public BlogController(BlogPostService blogPostService){
        this.blogPostService = blogPostService;
    }


    @GetMapping("/showAllDetails")
    public ResponseEntity<Response<List<BlogPost>>> showAllDetails(){
        List<BlogPost> result = blogPostService.getAllBlogPosts();
        Response<List<BlogPost>> response = Response.ok(result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/savePost")
    public ResponseEntity<?> savePost(@RequestBody BlogPost BlogPost){
        blogPostService.savePost(BlogPost);
        return new ResponseEntity<>(Response.ok("BlogPost save successful."), HttpStatus.OK);
    }

    @GetMapping("/getPostDetails/{id}")
    public ResponseEntity<Response<BlogPost>> getPostDetails(@PathVariable Integer id){
        BlogPost result = blogPostService.getPostDetails(id);
        Response<BlogPost> response = Response.ok(result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
