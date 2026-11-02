package com.example.rest.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

	@NotBlank(message="please enter a email")
	@Email(message="please enter a valid email")
	private String email;
	
	@NotBlank(message="please enter a password")
	private String password;
}
