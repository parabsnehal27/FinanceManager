package com.example.rest.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.example.rest.entity.CategoryType;

import lombok.Data;

@Data
public class TransactionResponse {

	private long id;
	
	private String title;
	
	private BigDecimal amount;
	
	private String description;
	
	private LocalDate transactiondate;
	
	private CategoryType type;
	
	private String categoryName;
	
	private long userId;
}
