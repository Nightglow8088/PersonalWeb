package com.example.backend.repositories;

import com.example.backend.model.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {
    @Query("SELECT bp FROM BlogPost bp JOIN FETCH bp.tags WHERE bp.id = :id")
    Optional<BlogPost> findByIdWithTags(@Param("id") Integer id);

    // 根据 tag_id 列表直接删除记录
//    void deleteByTagIdIn(List<Integer> tags);

}
