package com.example.rest.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.example.rest.entity.CategoryType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class TransactionRequest {

	@NotBlank(message="title is required")
	private String title;
	
	@NotNull(message="Amount is required")
	@Positive(message="amount should positive")
	private BigDecimal amount;
	
	private String description;
	
	@NotNull(message="transaction date is required")
	private LocalDate transactionDate;
	
	@NotNull(message="transaction type is required")
	private CategoryType type;
	
	@Positive(message="user id should be positive")
	private long userId;
	
	@Positive(message="category is should be positive")
	private long categoryId;
}
