package com.example.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rest.dto.LoginRequest;
import com.example.rest.dto.RegestarationRequest;
import com.example.rest.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/auth")
public class AuthController {

	@Autowired
	private AuthService authservice;
	

	@PostMapping("/register")
	public ResponseEntity<String> register(
	        @Valid @RequestBody RegestarationRequest request) {
	
	    String result = authservice.register(request);
	
	    if (result.equals("Email already registered")) {
	        return ResponseEntity
	                .status(HttpStatus.CONFLICT)
	                .body(result);
	    }
	
	    return ResponseEntity.ok(result);
	}

	
	@PostMapping("/login")
	public String login(@Valid @RequestBody LoginRequest request) {
		
		return authservice.login(request);
	}
}
