package com.example.dongho.controller;

import com.example.dongho.entity.*;
import com.example.dongho.exception.UserNotFoundException;
import com.example.dongho.service.*;
import com.example.dongho.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/private/product")
@CrossOrigin(origins="http://localhost:4200")
public class ProductRestController {


    @Autowired
    ProductServices productServices;

    @Autowired
    JwtUtil jwtUtil;


    @Autowired
    AddressServices addressServices;


    @PostMapping("/create")
    @PreAuthorize("hasAuthority('Admin')")
    public HttpStatus createProduct(@RequestBody Products products){
        if(productServices.existProduct(products.getId())){
            return HttpStatus.BAD_REQUEST;
        }
        else{
            productServices.save(products);
            return HttpStatus.CREATED;
        }
    }

    @GetMapping("/update")
    @PreAuthorize("hasAuthority('Admin')")
    public HttpStatus updateProduct(@RequestParam Integer id){
        Optional<Products> products = productServices.getProducts(id);
        products.get().setStatus(2);
        productServices.save(products.get());
        return HttpStatus.OK;
    }

//    @DeleteMapping("/delete")
//    public HttpStatus deleteProduct(@RequestParam Integer id) {
//        try{
//            productServices.deleteProduct(id);
//            return HttpStatus.OK;
//        }catch (Exception e){
//            return HttpStatus.BAD_REQUEST;
//        }
//    }
}
