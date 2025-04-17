package com.example.backend.serviceImpl;

import com.example.backend.model.BlogPost;
import com.example.backend.model.BlogPostDTO;
import com.example.backend.model.BlogPostTag;
import com.example.backend.repositories.BlogPostRepository;
import com.example.backend.repositories.BlogPostTagRepository;
import com.example.backend.services.BlogPostService;
import com.example.backend.tools.SnowflakeIdWorker;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class BlogPostServiceImpl implements BlogPostService {

    private static final Logger log = LoggerFactory.getLogger(BlogPostServiceImpl.class);

    private final BlogPostRepository blogPostRepository;

    private final BlogPostTagRepository blogPostTagRepository;

    private final SnowflakeIdWorker idWorker;


    @Autowired
    public BlogPostServiceImpl(BlogPostRepository blogPostRepository, SnowflakeIdWorker idWorker, BlogPostTagRepository blogPostTagRepository){
        this.blogPostRepository = blogPostRepository;
        this.blogPostTagRepository = blogPostTagRepository;
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
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }

//    @Override
//    public BlogPost savePostTest(BlogPostDTO BlogPostDTO) {
//        Set<BlogPostTag> managedTags = new HashSet<>();
//
//        if (BlogPostDTO.gettagIds() != null) {
//            for (String tagName : BlogPostDTO.getTags()) {
//                BlogPostTag tag = blogPostTagRepository.findByName(tagName)
//                        .orElseGet(() -> blogPostTagRepository.save(new BlogPostTag(tagName)));
//                managedTags.add(tag);
//            }
//        }
//
//        BlogPost blogPost = new BlogPost();
//        blogPost.setTitle(BlogPostDTO.getTitle());
//        blogPost.setBodyText(BlogPostDTO.getBodyText());
//        blogPost.setPosterId(BlogPostDTO.getPosterId());
//        blogPost.setSummary(BlogPostDTO.getSummary());
//        blogPost.setTags(managedTags);
//
//        return blogPostRepository.save(blogPost);
//    }

    @Override
    public BlogPost getBlogPostWithTags(Integer id) {
        try {
            return blogPostRepository.findByIdWithTags(id).orElseThrow(() ->
                    new RuntimeException("BlogPost with id " + id + " not found")
            );
        } catch (Exception e) {
            log.error("Failed to retrieve BlogPost with id " + id, e);
            throw e;
        }
    }


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


    public List<BlogPostTag> getAllTags() {
        return blogPostTagRepository.findAll();
    }

    public List<BlogPostTag> createTags(List<String> tags) {
        List<BlogPostTag> returnValue = new ArrayList<>();

        for (String tag : tags) {
            // 创建一个新的 BlogPostTag 对象
            BlogPostTag newTagObject = new BlogPostTag(tag);

            // 保存到数据库后，JPA 会自动填充生成的 ID
            BlogPostTag savedTag = blogPostTagRepository.save(newTagObject);

            // 将保存后的对象加入返回值列表
            returnValue.add(savedTag);
        }

        // 返回包含新插入标签的完整对象列表
        return returnValue;
    }

    //中间的delete我给注释了 这个接口少用
    public void removeTags(List<String> tagNames){
        List<Integer> tagIds = blogPostTagRepository.findIdsByNames(tagNames);
        if (tagIds.isEmpty()){
            return;
        }

//        blogPostRepository.deleteByTagIdIn(tagIds);

        // 3. 删除标签（通过名称或ID均可）
        blogPostTagRepository.deleteByNames(tagNames); // 方式1：直接按名称删除
        // 或 blogPostTagRepository.deleteAllById(tagIds); // 方式2：按ID删除


    }

    //GPT生成的
    @Override
    public BlogPostDTO create(BlogPostDTO dto) {
        BlogPost post = new BlogPost();
        post.setTitle(dto.getTitle());
        post.setBodyText(dto.getBodyText());
        post.setPosterId(dto.getPosterId());
        post.setSummary(dto.getSummary());
        // 关联标签
        Optional.ofNullable(dto.getTagIds()).orElse(Set.of())
                .forEach(tagId -> {
                    BlogPostTag tag = blogPostTagRepository.findById(Long.valueOf(tagId))
                            .orElseThrow(() -> new EntityNotFoundException("Tag " + tagId + " not found"));
                    post.addTag(tag);
                });
        BlogPost saved = blogPostRepository.save(post);
        return toDto(saved);
    }

    @Override
    public BlogPostDTO update(Integer id, BlogPostDTO dto) {
        BlogPost post = blogPostRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new EntityNotFoundException("Post " + id + " not found"));
        post.setTitle(dto.getTitle());
        post.setBodyText(dto.getBodyText());
        post.setPosterId(dto.getPosterId());
        post.setSummary(dto.getSummary());
        // 先清空旧关系
        new HashSet<>(post.getTags()).forEach(post::removeTag);
        // 再设置新关系
        Optional.ofNullable(dto.getTagIds()).orElse(Set.of())
                .forEach(tagId -> {
                    BlogPostTag tag = blogPostTagRepository.findById(Long.valueOf(tagId))
                            .orElseThrow(() -> new EntityNotFoundException("Tag " + tagId + " not found"));
                    post.addTag(tag);
                });
        return toDto(blogPostRepository.save(post));
    }

    @Override
    public void delete(Integer id) {
        blogPostRepository.deleteById(Long.valueOf(id));
    }

    @Override
    public BlogPostDTO getById(Integer id) {
        return blogPostRepository.findById(Long.valueOf(id))
                .map(this::toDto)
                .orElseThrow(() -> new EntityNotFoundException("Post " + id + " not found"));
    }

    @Override
    public List<BlogPostDTO> getAll() {
        return blogPostRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private BlogPostDTO toDto(BlogPost post) {
        BlogPostDTO dto = new BlogPostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setBodyText(post.getBodyText());
        dto.setPosterId(post.getPosterId());
        dto.setSummary(post.getSummary());
        dto.setTagIds(post.getTags().stream()
                .map(BlogPostTag::getId).collect(Collectors.toSet()));
        return dto;
    }






}
