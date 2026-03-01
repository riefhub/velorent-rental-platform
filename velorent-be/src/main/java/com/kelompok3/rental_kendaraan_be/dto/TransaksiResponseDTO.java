package com.kelompok3.rental_kendaraan_be.dto;

import java.time.LocalDate;

public class TransaksiResponseDTO {
    private Long transaksiId;
    private Long userId;
    private Long kendaraanId;
    private String namaKendaraan;
    private Double hargaKendaraan;
    private LocalDate tanggalPeminjaman;
    private LocalDate tanggalPengembalian;
    private Double totalHarga;
    private String statusTransaksi;
    private String gambar;

    // Constructor dari entity
    public TransaksiResponseDTO(Long transaksiId, Long userId, Long kendaraanId, String namaKendaraan,
                                Double hargaKendaraan, LocalDate tanggalPeminjaman,
                                LocalDate tanggalPengembalian, Double totalHarga, String statusTransaksi, String gambar) {
        this.transaksiId = transaksiId;
        this.userId = userId;
        this.kendaraanId = kendaraanId;
        this.namaKendaraan = namaKendaraan;
        this.hargaKendaraan = hargaKendaraan;
        this.tanggalPeminjaman = tanggalPeminjaman;
        this.tanggalPengembalian = tanggalPengembalian;
        this.totalHarga = totalHarga;
        this.statusTransaksi = statusTransaksi;
        this.gambar = gambar;
    }

    // Getter & Setter untuk transaksiId
    public Long getTransaksiId() {
        return transaksiId;
    }

    public void setTransaksiId(Long transaksiId) {
        this.transaksiId = transaksiId;
    }

    // Getter & Setter untuk userId
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    // Getter & Setter untuk kendaraanId
    public Long getKendaraanId() {
        return kendaraanId;
    }

    public void setKendaraanId(Long kendaraanId) {
        this.kendaraanId = kendaraanId;
    }

    // Getter & Setter untuk namaKendaraan
    public String getNamaKendaraan() {
        return namaKendaraan;
    }

    public void setNamaKendaraan(String namaKendaraan) {
        this.namaKendaraan = namaKendaraan;
    }

    // Getter & Setter untuk hargaKendaraan
    public Double getHargaKendaraan() {
        return hargaKendaraan;
    }

    public void setHargaKendaraan(Double hargaKendaraan) {
        this.hargaKendaraan = hargaKendaraan;
    }

    // Getter & Setter untuk tanggalPeminjaman
    public LocalDate getTanggalPeminjaman() {
        return tanggalPeminjaman;
    }

    public void setTanggalPeminjaman(LocalDate tanggalPeminjaman) {
        this.tanggalPeminjaman = tanggalPeminjaman;
    }

    // Getter & Setter untuk tanggalPengembalian
    public LocalDate getTanggalPengembalian() {
        return tanggalPengembalian;
    }

    public void setTanggalPengembalian(LocalDate tanggalPengembalian) {
        this.tanggalPengembalian = tanggalPengembalian;
    }

    // Getter & Setter untuk totalHarga
    public Double getTotalHarga() {
        return totalHarga;
    }

    public void setTotalHarga(Double totalHarga) {
        this.totalHarga = totalHarga;
    }

    // Getter & Setter untuk statusTransaksi
    public String getStatusTransaksi() {
        return statusTransaksi;
    }

    public void setStatusTransaksi(String statusTransaksi) {
        this.statusTransaksi = statusTransaksi;
    }

    public String getGambar(){
        return gambar;
    }

    public void setGambar(){
        this.gambar = gambar;
    }
}
