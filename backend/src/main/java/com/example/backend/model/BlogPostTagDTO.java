package com.example.backend.model;
import lombok.Data;

import java.util.Set;

@Data

public class BlogPostTagDTO {

    private Integer id;

    private String name;

    private Set<Integer> postIds;
}
