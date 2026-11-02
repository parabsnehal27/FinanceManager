package com.example.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.rest.repository.UserRepo;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userrepo;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        com.example.rest.entity.User user =
                userrepo.findByEmail(email)
                .orElseThrow(() ->
                    new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("USER")
                .build();
    }
}