package com.example.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.rest.dto.LoginRequest;
import com.example.rest.dto.RegestarationRequest;
import com.example.rest.entity.User;
import com.example.rest.repository.UserRepo;

@Service
public class AuthService {

	@Autowired
	private UserRepo userrepo;
	
	@Autowired
	private PasswordEncoder passwordencoder;
	
	@Autowired
	private JwtService jwtservice;

	public String register(RegestarationRequest request) {
		
		if(userrepo.existsByEmail(request.getEmail())) {
			return "Email already registered";
		}
		
		User user=new User();
		
		user.setName(request.getName());
		
		user.setEmail(request.getEmail());
		
		user.setPassword(passwordencoder.encode(request.getPassword()));
		
		userrepo.save(user);
		
		return "user registered successfully";
	}
	
	public String login(LoginRequest request) {
		
		User user=userrepo.findByEmail(request.getEmail()).orElseThrow(() -> new RuntimeException("user not found"));
		
		boolean passwordmatch=passwordencoder.matches(request.getPassword(),user.getPassword());
		
		if(!passwordmatch) {
			return "invalid password";
		}
		
		return jwtservice.generateToken(user.getEmail());
	} 
	
}
