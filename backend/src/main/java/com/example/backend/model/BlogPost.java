package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "blog_post", schema = "user_account")
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    // 把 bodyText 改成 TEXT
    @Column(name = "body_text", columnDefinition = "TEXT")
    private String bodyText;

    @Column(name = "poster_id")
    private Integer posterId;

    private String summary;


    @ManyToMany
    @JoinTable(
            schema = "user_account",
            name = "blog_post_tags_match",
            joinColumns = @JoinColumn(name = "blog_post_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<BlogPostTag> tags = new HashSet<>();


    // 双向关联 helper
    public void addTag(BlogPostTag tag) {
        // 防御性检查，确保 tags 不为 null
        if (tags == null) {
            tags = new HashSet<>();
        }
        tags.add(tag);
        // BlogPostTag.blogPosts 通常已经在其类里初始化
        tag.getBlogPosts().add(this);
    }
    public void removeTag(BlogPostTag tag) {
        tags.remove(tag);
        tag.getBlogPosts().remove(this);
    }

}