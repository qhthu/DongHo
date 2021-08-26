package com.example.dongho.repository;

import com.example.dongho.entity.Image;
import com.example.dongho.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
}
