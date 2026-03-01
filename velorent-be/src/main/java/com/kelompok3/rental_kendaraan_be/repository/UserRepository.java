package com.kelompok3.rental_kendaraan_be.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kelompok3.rental_kendaraan_be.model.User;

//Zainul
public interface UserRepository extends JpaRepository<User, Long> {
    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}
