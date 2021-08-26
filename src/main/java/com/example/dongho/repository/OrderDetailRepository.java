package com.example.dongho.repository;

import com.example.dongho.entity.OrderDetail;
import com.example.dongho.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}
