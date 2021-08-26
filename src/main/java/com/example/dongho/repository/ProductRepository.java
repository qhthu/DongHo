package com.example.dongho.repository;

import com.example.dongho.entity.Products;
import com.example.dongho.entity.User;
import org.hibernate.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {

}
