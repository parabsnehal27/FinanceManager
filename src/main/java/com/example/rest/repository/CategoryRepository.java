package com.example.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rest.entity.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {

}
