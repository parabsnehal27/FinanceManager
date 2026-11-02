package com.example.rest.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rest.dto.DashboardResponse;
import com.example.rest.dto.TransactionRequest;
import com.example.rest.dto.TransactionResponse;
import com.example.rest.entity.Transaction;
import com.example.rest.service.TransactionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:5173")
public class TransactionController {

	private final TransactionService transactionservice;
	
	@PostMapping
	public TransactionResponse addTransaction(
	        @Valid @RequestBody TransactionRequest request) {

	    Transaction transaction =
	            transactionservice.addTransaction(request);

	    return transactionservice.maptoResponse(transaction);
	}
	
	@GetMapping
	public List<TransactionResponse> getAllTransaction(){
		
		List<Transaction> transactions=transactionservice.getAllTransaction();
		
		return transactions.stream().map(transactionservice::maptoResponse).toList(); 
	}
	
	@GetMapping("{id}")
	public TransactionResponse getTransaction(@PathVariable long id) {
		
		Transaction transaction=transactionservice.gettransactionbyid(id);
		
		return transactionservice.maptoResponse(transaction);
	}
	
	@PutMapping("/{id}")
	public TransactionResponse updateTransaction(@PathVariable long id,@Valid @RequestBody TransactionRequest request) {
		
		Transaction transaction=transactionservice.updateTransaction(id, request);
		return transactionservice.maptoResponse(transaction);
		//return transactionservice.updateTransaction(id, request);
	}
	
	@DeleteMapping("/{id}")
	public String deleteTransaction(@PathVariable long id) {
	    transactionservice.deleteTransaction(id);
	    return "Transaction deleted successfully";
	}

	@GetMapping("/dashboard")
	public DashboardResponse getDashboard() {

	    return transactionservice.getDashboardSummary();
	}
	
	@GetMapping("/recent")
	public List<TransactionResponse> getRecentTransactions() {

	    List<Transaction> transactions =
	            transactionservice.getRecentTransactions();

	    return transactions.stream()
	            .map(transactionservice::maptoResponse)
	            .toList();
	}
}
