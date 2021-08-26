package com.example.dongho.controller;

import com.example.dongho.entity.*;
import com.example.dongho.exception.UserNotFoundException;
import com.example.dongho.service.*;
import com.example.dongho.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/private/address")
@CrossOrigin(origins="http://localhost:4200")
public class AddressRestController {

    @Autowired
    AddressServices addressServices;

    @GetMapping("/listaddress")
    public List<Address> getListAddress(){
        return addressServices.getListAddress();
    }
}