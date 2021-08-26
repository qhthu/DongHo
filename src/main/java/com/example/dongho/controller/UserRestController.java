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
@RequestMapping("/api/private/user")
@CrossOrigin(origins="http://localhost:4200")
public class UserRestController {

    @Autowired
    AuthenticationManager authenticate;

    @Autowired
    UserServices userServices;

    @GetMapping("/list")
    public List<User> getListUser(){
        return userServices.getListUser();
    }

    @GetMapping("/getuserbyid")
    public Optional<User> getUserById(@RequestParam Integer id){
        return userServices.getUserById(id);
    }

    @GetMapping("/deleteuserbyid")
    public void deleteUserById(@RequestParam Integer id){
        userServices.deleteUser(id);
    }

}
