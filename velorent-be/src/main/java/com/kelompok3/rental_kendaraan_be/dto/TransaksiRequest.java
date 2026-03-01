package com.kelompok3.rental_kendaraan_be.dto;

public class TransaksiRequest {
    private Long userId;
    private Long kendaraanId;
    private String tanggalPeminjaman;
    private String tanggalPengembalian;
    private Double totalHarga;

    // Konstruktor
    public TransaksiRequest(Long userId, Long kendaraanId, String tanggalPeminjaman, String tanggalPengembalian, Double totalHarga) {
        this.userId = userId;
        this.kendaraanId = kendaraanId;
        this.tanggalPeminjaman = tanggalPeminjaman;
        this.tanggalPengembalian = tanggalPengembalian;
        this.totalHarga = totalHarga;
    }

    // Getter dan Setter
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getKendaraanId() {
        return kendaraanId;
    }

    public void setKendaraanId(Long kendaraanId) {
        this.kendaraanId = kendaraanId;
    }

    public String getTanggalPeminjaman() {
        return tanggalPeminjaman;
    }

    public void setTanggalPeminjaman(String tanggalPeminjaman) {
        this.tanggalPeminjaman = tanggalPeminjaman;
    }

    public String getTanggalPengembalian() {
        return tanggalPengembalian;
    }

    public void setTanggalPengembalian(String tanggalPengembalian) {
        this.tanggalPengembalian = tanggalPengembalian;
    }

    public Double getTotalHarga() {
        return totalHarga;
    }

    public void setTotalHarga(Double totalHarga) {
        this.totalHarga = totalHarga;
    }
}
