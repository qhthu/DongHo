package com.example.dongho.repository;

import com.example.dongho.entity.Products;
import com.example.dongho.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {
}
