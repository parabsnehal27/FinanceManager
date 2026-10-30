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

import com.example.rest.dto.TransactionRequest;
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
	public Transaction addTransaction(@Valid @RequestBody TransactionRequest request) {
		return transactionservice.addTransaction(request);
	}
	
	@GetMapping
	public List<Transaction> getAllTransaction(){
		
		return transactionservice.getAllTransaction();
	}
	
	@DeleteMapping("/{id}")
	public String deleteTransaction(@PathVariable long id) {
	    transactionservice.deleteTransaction(id);
	    return "Transaction deleted successfully";
	}

	@GetMapping("{id}")
	public Transaction getTransaction(@PathVariable long id) {
		return transactionservice.gettransactionbyid(id);
	}
	
	@PutMapping("/{id}")
	public Transaction updateTransaction(@PathVariable long id,@Valid @RequestBody TransactionRequest request) {
		
		return transactionservice.updateTransaction(id, request);
	}
}
