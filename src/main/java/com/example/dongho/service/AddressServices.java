package com.example.dongho.service;

import com.example.dongho.entity.Address;
import com.example.dongho.entity.Products;
import com.example.dongho.repository.AddressRepository;
import com.example.dongho.repository.ProductRepository;
import com.example.dongho.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServices {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    AddressRepository addressRepository;

    public List<Address> getListAddress(){
        return addressRepository.findAll();
    }
}
