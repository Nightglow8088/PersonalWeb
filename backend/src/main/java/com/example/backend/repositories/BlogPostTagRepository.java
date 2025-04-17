package com.example.backend.repositories;

import com.example.backend.model.BlogPost;
import com.example.backend.model.BlogPostTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface BlogPostTagRepository  extends JpaRepository<BlogPostTag, Long> {
//    List<BlogPost> findAllByTags_name(String tagName);
    Optional<BlogPostTag> findByName(String name);

    // 根据名称直接删除标签（可选）
    @Modifying
    @Query("DELETE FROM BlogPostTag t WHERE t.name IN :tagNames")
    void deleteByNames(@Param("tagNames") List<String> tagNames);

    // 根据标签名称查找ID列表
    @Query("SELECT t.id FROM BlogPostTag t WHERE t.name IN :tagNames")
    List<Integer> findIdsByNames(@Param("tagNames") List<String> tagNames);

}
