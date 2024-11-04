package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "blog_post", schema = "user_account")
public class BlogPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @Column(name = "body_text")
    private String bodyText;

    @Column(name = "poster_id")
    private Integer posterId;

    private String summary;



}
