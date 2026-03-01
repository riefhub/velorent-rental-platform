package com.kelompok3.rental_kendaraan_be.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String namaLengkap;

    @Column(nullable = false)
    private String noTelepon;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    // Constructors
    public User() {
        this.createdAt = LocalDateTime.now();
    }

    public User(String username, String password, String email, String namaLengkap, String noTelepon, String role, LocalDateTime createdAt) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.namaLengkap = namaLengkap;
        this.noTelepon = noTelepon;
        this.setRole(role);
        this.createdAt = (createdAt != null) ? createdAt : LocalDateTime.now();
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNamaLengkap() {
        return namaLengkap;
    }

    public void setNamaLengkap(String namaLengkap) {
        this.namaLengkap = namaLengkap;
    }

    public String getNoTelepon() {
        return noTelepon;
    }
    
    public void setNoTelepon(String noTelepon) {
        this.noTelepon = noTelepon;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        if (role == null || role.isEmpty()) {
            this.role = "PENYEWA";
        } else if (role.equals("ADMIN") || role.equals("PENYEWA")) {
            this.role = role; 
        } else {
            throw new IllegalArgumentException("Role must be either 'ADMIN' or 'PENYEWA'");
        }
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
