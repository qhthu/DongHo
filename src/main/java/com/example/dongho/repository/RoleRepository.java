package com.example.dongho.repository;

import com.example.dongho.entity.Products;
import com.example.dongho.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
}
