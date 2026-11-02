package com.example.rest.service;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	private final String SECRET_KEY="mySecretKeyForFinanceManagerApplication12345678";
	
	private Key getSigninKey() {
		
		return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
		
	}
	

	public String generateToken(String email) {
	
	    return Jwts.builder()
	            .subject(email)
	            .issuedAt(new Date())
	            .expiration(
	                new Date(System.currentTimeMillis() + 86400000)
	            )
	            .signWith(getSigninKey())
	            .compact();
	}


	public String extractUsername(String token) {
	    return Jwts.parser()
	            .verifyWith((SecretKey) getSigninKey())
	            .build()
	            .parseSignedClaims(token)
	            .getPayload()
	            .getSubject();
	}

	public boolean isTokenValid(String token) {
		try {
			Jwts.parser()
			.verifyWith((SecretKey) getSigninKey())
			.build()
			.parseSignedClaims(token);
			
			return true;
		}
		
		catch(Exception ex) {
			return false;
		}
	}
	
}
