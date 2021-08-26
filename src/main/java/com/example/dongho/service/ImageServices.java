package com.example.dongho.service;

import com.example.dongho.entity.Image;
import com.example.dongho.entity.Products;
import com.example.dongho.repository.ImageRepository;
import com.example.dongho.repository.ProductRepository;
import com.example.dongho.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageServices {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ImageRepository imageRepository;

    public List<Image> getListImages(){
        return imageRepository.findAll();
    }
}
