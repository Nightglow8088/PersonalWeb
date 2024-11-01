package com.example.backend.controllers;

import com.example.backend.model.GalleryImage;
import com.example.backend.model.Users;
import com.example.backend.response.Response;
import com.example.backend.services.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ImagesController")
public class ImagesController {

    private final ImagesService imagesService;

    @Autowired
    public ImagesController(ImagesService imagesService){
        this.imagesService = imagesService;
    }

    @GetMapping("/showAll")
    public ResponseEntity<Response<List<GalleryImage>>> getAllUser(){
        List<GalleryImage> result = imagesService.getAllGalleryImages();
        Response<List<GalleryImage>> response = Response.ok(result);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
