package com.example.dongho.service;

import com.example.dongho.entity.Products;
import com.example.dongho.entity.User;
import com.example.dongho.repository.ProductRepository;
import com.example.dongho.repository.UserRepository;
import org.hibernate.dialect.SQLServerDialect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServices {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    ProductRepository productRepository;

    public List<Products> getListProducts(){
        return productRepository.findAll();
    }
    public Boolean existProduct(Integer id){
        return productRepository.existsById(id);
    }
    public void save(Products products){
        productRepository.save(products);
    }

    public Optional<Products> getProducts(Integer id){
        return productRepository.findById(id);
    }

    public void deleteProduct(Integer id){
        productRepository.deleteById(id);
    }

    public List<Products> getListNewProducts(){
        List<Products> list = null;
        String sql = "select * from select_new_product";
        list = jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Products.class));
        return list;
    }

    public List<Products> getListSaleProducts(){
        List<Products> list = null;
        String sql = "select * from select_sale_product";
        list = jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Products.class));
        return list;
    }
}
