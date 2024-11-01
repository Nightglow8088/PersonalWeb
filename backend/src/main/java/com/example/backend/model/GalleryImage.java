package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "gallery_image", schema = "images")
public class GalleryImage {
    @Id
    private Integer id;

    private String name;

    private String review;
}
