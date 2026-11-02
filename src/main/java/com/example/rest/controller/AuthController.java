package com.example.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
	public String register(@Valid @RequestBody RegestarationRequest request) {
		return authservice.register(request);
	}
	
	@PostMapping("/login")
	public String login(@Valid @RequestBody LoginRequest request) {
		
		return authservice.login(request);
	}
}
