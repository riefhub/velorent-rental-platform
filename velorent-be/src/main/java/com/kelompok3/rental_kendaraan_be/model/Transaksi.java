package com.kelompok3.rental_kendaraan_be.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "transaksi")
public class Transaksi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User penyewa;  // Menghubungkan dengan User (Penyewa)

    @ManyToOne
    @JoinColumn(name = "kendaraan_id", nullable = false)
    private Kendaraan kendaraan;  // Menghubungkan dengan Kendaraan (Mobil atau Motor)

    @OneToOne(mappedBy = "transaksi", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Pembayaran pembayaran;

    @Column(name = "tanggal_peminjaman", nullable = false)
    private LocalDate tanggalPeminjaman;

    @Column(name = "tanggal_pengembalian", nullable = false)
    private LocalDate tanggalPengembalian;

    @Column(name = "total_harga", nullable = false)
    private Double totalHarga;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_transaksi", nullable = false)
    private StatusTransaksi statusTransaksi;  // Status transaksi: PENDING, SEDANG_SEWA, SELESAI



    // Constructors
    public Transaksi() {
    }

    public Transaksi(User penyewa, Kendaraan kendaraan, Pembayaran pembayaran, LocalDate tanggalPeminjaman, LocalDate tanggalPengembalian, Double totalHarga, StatusTransaksi statusTransaksi) {
        this.penyewa = penyewa;
        this.kendaraan = kendaraan;
        this.pembayaran = pembayaran;
        this.tanggalPeminjaman = tanggalPeminjaman;
        this.tanggalPengembalian = tanggalPengembalian;
        this.totalHarga = totalHarga;
        this.statusTransaksi = statusTransaksi;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getPenyewa() {
        return penyewa;
    }

    public void setPenyewa(User penyewa) {
        this.penyewa = penyewa;
    }

    public Kendaraan getKendaraan() {
        return kendaraan;
    }

    public void setKendaraan(Kendaraan kendaraan) {
        this.kendaraan = kendaraan;
    }

    public Pembayaran getPembayaran() {
        return pembayaran;
    }

    public void setPembayaran(Pembayaran pembayaran) {
        this.pembayaran = pembayaran;
    }

    public LocalDate getTanggalPeminjaman() {
        return tanggalPeminjaman;
    }

    public void setTanggalPeminjaman(LocalDate tanggalPeminjaman) {
        this.tanggalPeminjaman = tanggalPeminjaman;
    }

    public LocalDate getTanggalPengembalian() {
        return tanggalPengembalian;
    }

    public void setTanggalPengembalian(LocalDate tanggalPengembalian) {
        this.tanggalPengembalian = tanggalPengembalian;
    }

    public Double getTotalHarga() {
        return totalHarga;
    }

    public void setTotalHarga(Double totalHarga) {
        this.totalHarga = totalHarga;
    }

    public StatusTransaksi getStatusTransaksi() {
        return statusTransaksi;
    }

    public void setStatusTransaksi(StatusTransaksi statusTransaksi) {
        this.statusTransaksi = statusTransaksi;
    }


    public enum StatusTransaksi {
        PENDING,
        SEDANG_SEWA,
        SELESAI
    }
}
