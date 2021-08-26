package com.example.dongho.controller;

import com.example.dongho.entity.*;
import com.example.dongho.exception.UserNotFoundException;
import com.example.dongho.service.*;
import com.example.dongho.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/private/od")
@CrossOrigin(origins="http://localhost:4200")
public class OrderDetailRestController {


    @Autowired
    OrderDetailServices orderDetailServices;

    @GetMapping("/update")
    public HttpStatus updateOrderDetail(@RequestParam Integer id, Integer orderId){
        Optional<OrderDetail> orderDetail = orderDetailServices.getOrderDetail(id);
        orderDetail.get().setOrderId(orderId);
        orderDetailServices.save(orderDetail.get());
        return HttpStatus.OK;
    }

    @PostMapping("/create")
    public HttpStatus createOrderDetail(@RequestBody OrderDetail detail){
        if(orderDetailServices.existOrderDetail(detail.getId())){
            return HttpStatus.BAD_REQUEST;
        }
        else{
            orderDetailServices.save(detail);
            return HttpStatus.CREATED;
        }
    }

    @GetMapping("/list")
    public List<OrderDetail> getListOderDetail(){
        return orderDetailServices.getListOrderDetails();
    }

}
