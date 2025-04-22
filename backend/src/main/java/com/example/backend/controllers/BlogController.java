package com.example.backend.controllers;

import com.example.backend.model.BlogPost;
import com.example.backend.model.BlogPostDTO;
import com.example.backend.model.BlogPostTag;
import com.example.backend.response.Response;
import com.example.backend.services.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/BlogController")
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



//    @PostMapping("/savePostTest")
//    public ResponseEntity<?> savePostTest(@RequestBody BlogPostDTO blogPostDTO){
//        BlogPost result = blogPostService.savePostTest(blogPostDTO);
//        Response<BlogPost> response = Response.ok(result);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    @GetMapping("/getPostTest/{id}")
    public ResponseEntity<?> getPostTest(@PathVariable Integer id){

        BlogPost result = blogPostService.getBlogPostWithTags(id);
        Response<BlogPost> response = Response.ok(result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/getAllTags")
    public ResponseEntity<?> getAllTags(){
        List<BlogPostTag> result = blogPostService.getAllTags();
        Response<List<BlogPostTag>> response = Response.ok(result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/createTags")
    public ResponseEntity<?> createTags(@RequestBody List<String> tags){
        List<BlogPostTag> result = blogPostService.createTags(tags);
        Response<List<BlogPostTag>> response = Response.ok(result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/removeTags")
    public ResponseEntity<?> removeTags(@RequestBody List<String> tags){
        blogPostService.removeTags(tags);
        return ResponseEntity.noContent().build();
//        Response<List<BlogPostTag>> response = Response.ok(result);
//        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //关于post的GPT生成代码!!!!!!
    @PostMapping("/create")
    public ResponseEntity<Response<BlogPostDTO>> create(@RequestBody BlogPostDTO dto) {
        return new ResponseEntity<>( Response.ok(blogPostService.create(dto)), HttpStatus.CREATED);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Response<BlogPostDTO>> getById(@PathVariable Integer id) {
        BlogPostDTO dto = blogPostService.getById(id);
        return ResponseEntity.ok(Response.ok(dto));
    }

    /** 查询所有文章 **/
    @GetMapping("/getAll")
    public ResponseEntity<Response<List<BlogPostDTO>>> getAll() {
        List<BlogPostDTO> list = blogPostService.getAll();
        return ResponseEntity.ok(Response.ok(list));
    }

    /** 更新文章 **/
    @PostMapping("/update/{id}")
    public ResponseEntity<Response<BlogPostDTO>> update(
            @PathVariable Integer id,
            @RequestBody BlogPostDTO dto) {
        BlogPostDTO updated = blogPostService.update(id, dto);
        return ResponseEntity.ok(Response.ok(updated));
    }

    /** 删除文章 **/
    @PostMapping("/delete/{id}")
    public ResponseEntity<Response<Void>> delete(@PathVariable Integer id) {
        blogPostService.delete(id);
        return ResponseEntity.ok(Response.ok());
    }



}
