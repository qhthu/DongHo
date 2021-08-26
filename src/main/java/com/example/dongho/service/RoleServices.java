package com.example.dongho.service;

import com.example.dongho.entity.Products;
import com.example.dongho.entity.Role;
import com.example.dongho.repository.ProductRepository;
import com.example.dongho.repository.RoleRepository;
import com.example.dongho.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServices {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    RoleRepository roleRepository;

    public List<Role> getListRoles(){
        return roleRepository.findAll();
    }
}
