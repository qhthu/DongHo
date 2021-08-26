package com.example.dongho.service;

import com.example.dongho.entity.Orders;
import com.example.dongho.repository.OrderRepository;
import com.example.dongho.repository.ProductRepository;
import com.example.dongho.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServices {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderRepository orderRepository;

    public List<Orders> getListOrders(){
        return orderRepository.findAll();
    }
    public void saveOrder(Orders orders){
        orderRepository.save(orders);
    }
    public Boolean existOrder(Integer id){
        return orderRepository.existsById(id);
    }


}
