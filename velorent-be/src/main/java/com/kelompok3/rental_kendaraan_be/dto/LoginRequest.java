package com.kelompok3.rental_kendaraan_be.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest {
    @NotBlank(message = "Username tidak boleh kosong")
    @Size(min = 3, max = 20, message = "Username harus antara 3 hingga 20 karakter")
    private String username;
    @NotBlank(message = "Password tidak boleh kosong")
    private String password;

    // Getter dan Setter
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
}
