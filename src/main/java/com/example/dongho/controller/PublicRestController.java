package com.example.dongho.controller;

import com.example.dongho.entity.Image;
import com.example.dongho.entity.Products;
import com.example.dongho.entity.User;
import com.example.dongho.exception.UserNotFoundException;
import com.example.dongho.service.*;
import com.example.dongho.util.JwtUtil;
import com.google.common.cache.CacheBuilder;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.internal.LoadingCache;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins="http://localhost:4200")
public class PublicRestController {


    @Autowired
    ImageServices imageServices;

    @Autowired
    ProductServices productServices;

    @Autowired
    AuthenticationManager authenticate;

    @Autowired
    UserServices userServices;

    @Autowired
    RequestServices requestServices;

    @Autowired
    LoginServices loginServices;

    @Autowired
    OrderDetailServices orderDetailServices;

    @Autowired
    JwtUtil jwtUtil;


//    @GetMapping("/user/deleteuserbyid")
//    public void deleteUserById(@RequestParam Integer id){
//        System.out.println("id:"+id);
//        userServices.deleteUser(id);
//    }

    @GetMapping("/user/get")
    public ResponseEntity<User> getUserById(@RequestParam String username) throws Exception {
        Optional<User> u = null;
        try {
            u = Optional.ofNullable(userServices.getUserByUsername(username).orElseThrow(() -> new UserNotFoundException("Khong tim thay user "+username)));
        }catch (Exception e){
            return new ResponseEntity(u,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(u, HttpStatus.OK);
    }

    @GetMapping("/cartnumber")
    public Integer getCartNumber(@RequestParam String username){
        return orderDetailServices.getCartNumber(username);
    }

    @PostMapping("/generate")
    public String generateToken(@RequestBody User user, HttpServletRequest request) throws Exception {
        String clientIp = requestServices.getClientIp(request);
        User u = null;
        try{
            u = userServices.getUserByUsername(user.getUsername()).get();
        }catch (Exception e){
            loginServices.loginFailed(clientIp);
            return "notfound";
        }
        if(u.getStatus() == 1){
            if(!loginServices.blockIP(clientIp)){
                try{
                    authenticate.authenticate(
                            new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
                    );
                }catch (Exception ex){
                    loginServices.loginFailed(clientIp);
                    return "not";
                }
                loginServices.remove(clientIp);
                return jwtUtil.generateToken(user.getUsername());
            }
            else{
                return "block";
            }
        }else {
            loginServices.loginFailed(clientIp);
            return "not";
        }
    }

    @PostMapping("/user/create")
    public User createUser(@RequestBody User user){
        if(userServices.existsUser(user.getUsername())){
            System.out.println(user.getUsername());
            return null;
        }
        else{
            userServices.saveUser(user);
            return user;
        }
    }

    @GetMapping("/product/list")
    public List<Products> getListProduct(){
        return productServices.getListProducts();
    }

    @GetMapping("/product/get")
    public Optional<Products> getProduct(@RequestParam Integer id){
        return productServices.getProducts(id);
    }

    @GetMapping("/product/listnew")
    public List<Products> getListNewProducts(){
        return productServices.getListNewProducts();
    }

    @GetMapping("/product/listsale")
    public List<Products> getListSaleProducts(){
        return productServices.getListSaleProducts();
    }

    @GetMapping("/image/list")
    public List<Image> getListImage(){
        return imageServices.getListImages();
    }

}
