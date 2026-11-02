package com.example.rest.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.example.rest.entity.CategoryType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
	
	@NotNull(message="Category ID is required")
	@Positive(message="Category ID must be positive")
	private Long categoryId;
}
