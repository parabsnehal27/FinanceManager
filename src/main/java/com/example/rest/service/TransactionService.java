package com.example.rest.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.rest.dto.TransactionRequest;
import com.example.rest.entity.Category;
import com.example.rest.entity.Transaction;
import com.example.rest.entity.User;
import com.example.rest.repository.CategoryRepository;
import com.example.rest.repository.TransactionRepository;
import com.example.rest.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionService {

	
	private final TransactionRepository transactionrepository;
	
	private final UserRepository userrepository;
	
	private final CategoryRepository categoryrepository;
	
	public Transaction addTransaction(TransactionRequest request) {
		
		
		User user=userrepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("user not found"));
		
		Category category=categoryrepository.findById(request.getCategoryId()).orElseThrow(() -> new RuntimeException("category not found"));
		
		Transaction transaction=new Transaction();
		
		transaction.setTitle(request.getTitle());
		
		transaction.setAmount(request.getAmount());;
		
		transaction.setDecription(request.getDescription());;
		
		transaction.setTransactiondate(request.getTransactionDate());;
		
		transaction.setType(request.getType());
		
		transaction.setUser(user);
		
		transaction.setCategoty(category);
		
		return transactionrepository.save(transaction);
	}
	
	public List<Transaction> getAllTransaction(){
		return transactionrepository.findAll();
	}
	
	public void deleteTransaction(long id) {
		transactionrepository.deleteById(id);
	}
	
	public Transaction gettransactionbyid(long id) {
		
		return transactionrepository.findById(id).orElseThrow(() ->new RuntimeException("transaction not found"));
		
	}
	
	public Transaction updateTransaction(long id,TransactionRequest request) {
			
			
			User user=userrepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("user not found"));
			
			Category category=categoryrepository.findById(request.getCategoryId()).orElseThrow(() -> new RuntimeException("category not found"));
			
			Transaction transaction=new Transaction();
			
			transaction.setTitle(request.getTitle());
			
			transaction.setAmount(request.getAmount());;
			
			transaction.setDecription(request.getDescription());;
			
			transaction.setTransactiondate(request.getTransactionDate());;
			
			transaction.setType(request.getType());
			
			transaction.setUser(user);
			
			transaction.setCategoty(category);
			
			return transactionrepository.save(transaction);
		}
}
