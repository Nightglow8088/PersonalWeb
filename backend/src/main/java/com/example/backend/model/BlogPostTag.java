package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Data
@Entity
@Table(name = "blog_post_tag", schema = "user_account")
public class BlogPostTag {

    public BlogPostTag(String name){
        this.name = name;
    }

    public BlogPostTag() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;




    @ManyToMany(mappedBy = "tags")
    @JsonIgnore
    private Set<BlogPost> blogPosts = new HashSet<>();

    // 双向关联 helper
    public void addPost(BlogPost post) {
        blogPosts.add(post);
        post.getTags().add(this);
    }
    public void removePost(BlogPost post) {
        blogPosts.remove(post);
        post.getTags().remove(this);
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BlogPostTag tag = (BlogPostTag) o;
        return Objects.equals(id, tag.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    // 排除 blogPosts 的 toString 实现，避免递归
    @Override
    public String toString() {
        return "BlogPostTag{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }



}
