package com.example.rest.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.rest.dto.DashboardResponse;
import com.example.rest.dto.TransactionRequest;
import com.example.rest.dto.TransactionResponse;
import com.example.rest.entity.Category;
import com.example.rest.entity.CategoryType;
import com.example.rest.entity.Transaction;
import com.example.rest.entity.User;
import com.example.rest.exception.ResourceNotFoundException;
import com.example.rest.repository.CategoryRepository;
import com.example.rest.repository.TransactionRepo;
import com.example.rest.repository.TransactionRepository;
import com.example.rest.repository.UserRepo;
import com.example.rest.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionService {

	
	private final TransactionRepository transactionrepository;
	
	private final UserRepository userrepository;
	
	private final UserRepo userrepo;
	
	private final TransactionRepo  transactionrepo;
	
	private final CategoryRepository categoryrepository;
	
	public Transaction addTransaction(TransactionRequest request) {
		
		
		User user = userrepo.findByEmail(getLoggedInUserEmail())
			    .orElseThrow(() -> new ResourceNotFoundException("user not found"));
		
		Category category=categoryrepository.findById(request.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("category not found"));
		
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
	
	public List<Transaction> getAllTransaction() {

	    String email = getLoggedInUserEmail();

	    return transactionrepo.findByUserEmail(email);
	}
	
	public void deleteTransaction(long id) {

	    String email = getLoggedInUserEmail();

	    Transaction transaction = transactionrepo
	            .findByIdAndUserEmail(id, email)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException(
	                            "Transaction not found"));

	    transactionrepo.delete(transaction);
	}
	
	public Transaction gettransactionbyid(long id) {

	    String email = getLoggedInUserEmail();

	    return transactionrepo.findByIdAndUserEmail(id, email)
	            .orElseThrow(() ->
	                new ResourceNotFoundException("Transaction not found"));
	}
	

	public Transaction updateTransaction(long id, TransactionRequest request) {
	
	    String email = getLoggedInUserEmail();
	
	    Transaction transaction = transactionrepo
	            .findByIdAndUserEmail(id, email)
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Transaction not found"));
	
	    Category category = categoryrepository
	            .findById(request.getCategoryId())
	            .orElseThrow(() ->
	                    new ResourceNotFoundException("Category not found"));
	
	    transaction.setTitle(request.getTitle());
	    transaction.setAmount(request.getAmount());
	    transaction.setDecription(request.getDescription());
	    transaction.setTransactiondate(request.getTransactionDate());
	    transaction.setType(request.getType());
	    transaction.setCategoty(category);
	
	    return transactionrepository.save(transaction);
	}

	
	public TransactionResponse maptoResponse(Transaction transaction) {
		
		TransactionResponse response=new TransactionResponse();
		
		response.setId(transaction.getId());
		
		response.setTitle(transaction.getTitle());
		
		response.setAmount(transaction.getAmount());
		
		response.setDescription(transaction.getDecription());
		
		response.setTransactiondate(transaction.getTransactiondate());
		
		response.setCategoryName(transaction.getCategoty().getName());
		
		response.setType(transaction.getType());
		
		response.setUserId(transaction.getId());
		
		return response;
	}
	

	private String getLoggedInUserEmail() {
	    return SecurityContextHolder.getContext()
	            .getAuthentication()
	            .getName();
	}
	
	public DashboardResponse getDashboardSummary() {
		
		String email=getLoggedInUserEmail();
		
		BigDecimal income=transactionrepo.getTotalByType(email, CategoryType.Income);

		BigDecimal expense=transactionrepo.getTotalByType(email, CategoryType.Expense);
	
		DashboardResponse response=new DashboardResponse();
		
		response.setTotalIncome(income);
		response.setTotalExpense(expense);
		response.setBalance(income.subtract(expense));
		
		return response;
		
	}
	
	public List<Transaction> getRecentTransactions() {

	    String email = getLoggedInUserEmail();

	    return transactionrepo
	            .findTop5ByUserEmailOrderByTransactiondateDesc(email);
	}

}
