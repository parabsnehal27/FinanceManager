package com.example.rest.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.rest.entity.CategoryType;
import com.example.rest.entity.Transaction;


public interface TransactionRepo
        extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserEmail(String email);

    Optional<Transaction> findByIdAndUserEmail(long id, String email);

    void deleteByIdAndUserEmail(long id, String email);

    @Query("""
    	    SELECT COALESCE(SUM(t.amount), 0)
    	    FROM Transaction t
    	    WHERE t.user.email = :email
    	    AND t.type = :type
    	""")
    	BigDecimal getTotalByType(
    	        @Param("email") String email,
    	        @Param("type") CategoryType type);
    
    List<Transaction> findTop5ByUserEmailOrderByTransactiondateDesc(
            String email);
}