package com.example.dongho.service;

import com.example.dongho.entity.OrderDetail;
import com.example.dongho.entity.Products;
import com.example.dongho.entity.User;
import com.example.dongho.repository.OrderDetailRepository;
import com.example.dongho.repository.ProductRepository;
import com.example.dongho.repository.UserRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class OrderDetailServices {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    public List<OrderDetail> getListOrderDetails(){
        return orderDetailRepository.findAll();
    }
    public Boolean existOrderDetail(Integer id){
        return orderDetailRepository.existsById(id);
    }

    public Optional<OrderDetail> getOrderDetail(Integer id){
        return orderDetailRepository.findById(id);
    }
    public void save(OrderDetail detail){
        orderDetailRepository.save(detail);
    }

    public Integer getCartNumber(String username){
        User user = userRepository.findUsersByUsername(username);
        List<Object> list = null;
        String sql = "select count(id) from ORDER_DETAIL where USER_ID = 1";
        list = jdbcTemplate.queryForList(sql, Object.class);
        return Integer.parseInt(list.get(0).toString());
    }
}
