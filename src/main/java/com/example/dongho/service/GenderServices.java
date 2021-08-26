package com.example.dongho.service;

import com.example.dongho.entity.Gender;
import com.example.dongho.entity.Products;
import com.example.dongho.repository.GenderRepository;
import com.example.dongho.repository.ProductRepository;
import com.example.dongho.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenderServices {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    GenderRepository genderRepository;

    public List<Gender> getListGenders(){
        return genderRepository.findAll();
    }
}
