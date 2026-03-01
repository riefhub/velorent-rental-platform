package com.kelompok3.rental_kendaraan_be.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthResponseDTO {
    private String token;
    private String tokenType = "Bearer ";
    private String username;
    private String role;
    private Long id;

    public AuthResponseDTO(String token, String tokenType, String username, String role, Long id) {
        this.token = token;
        this.tokenType = tokenType;
        this.username = username;
        this.role = role;
        this.id = id;
    }

    // Constructor untuk login gagal (error message sebagai token)
    public AuthResponseDTO(String message) {
        this.token = message;
    }
}
