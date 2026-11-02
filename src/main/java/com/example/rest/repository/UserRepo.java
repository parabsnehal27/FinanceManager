package com.example.rest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rest.entity.User;

public interface UserRepo extends JpaRepository<User,Long> {

	boolean existsByEmail(String email);
	
	 Optional<User> findByEmail(String email);
}
