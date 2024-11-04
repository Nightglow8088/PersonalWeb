package com.example.backend.repositories;

import com.example.backend.model.BlogPost;
import com.example.backend.model.GalleryImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

}
