package com.example.backend.model;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data


public class BlogPostDTO {

    private Integer id;

    private String title;

    private String bodyText;

    private Integer posterId;

    private String posterName;

    private String summary;

    private Set<String> tags;
}
