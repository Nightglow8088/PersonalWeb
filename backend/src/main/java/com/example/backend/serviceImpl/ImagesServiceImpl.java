package com.example.backend.serviceImpl;

import com.example.backend.model.GalleryImage;
import com.example.backend.repositories.GalleryImageRepository;
import com.example.backend.services.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ImagesServiceImpl implements ImagesService {

    private final GalleryImageRepository galleryImageRepository;

    @Autowired
    public ImagesServiceImpl(GalleryImageRepository galleryImageRepository) {
        this.galleryImageRepository = galleryImageRepository;
    }


    @Override
    public List<GalleryImage> getAllGalleryImages() {
        return galleryImageRepository.findAll();
    }
}
