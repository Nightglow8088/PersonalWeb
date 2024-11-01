package com.example.backend.services;

import com.example.backend.model.GalleryImage;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ImagesService {
    public List<GalleryImage> getAllGalleryImages();
}
