package com.example.rest.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class DashboardResponse {

	private BigDecimal totalIncome;
	private BigDecimal totalExpense;
	private BigDecimal balance;
}
