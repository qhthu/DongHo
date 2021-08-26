package com.example.dongho.service;

import com.example.dongho.entity.Status;
import com.example.dongho.repository.StatusRepository;
import com.example.dongho.repository.ProductRepository;
import com.example.dongho.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusServices {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    StatusRepository statusRepository;

    public List<Status> getListStatus(){
        return statusRepository.findAll();
    }
}
