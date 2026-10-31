package com.example.rest.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException ex){
		
		Map<String, Object> errors=new HashMap<>();
		
		ex.getBindingResult().getFieldErrors().forEach(error->
				errors.put(error.getField(),error.getDefaultMessage()));
		
		Map<String,Object> response=new HashMap<>();
		
		response.put("message","Validation failed");
		response.put("errors", errors);
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<Map<String,String>> handleRuntimeException (RuntimeException ex){
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message",ex.getMessage()));
	}
	
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<Map<String,String>> handleResoucseNotFound(ResourceNotFoundException ex){
		
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message",ex.getMessage()));
	}
}
