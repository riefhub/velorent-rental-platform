package com.kelompok3.rental_kendaraan_be.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "pembayaran")
public class Pembayaran {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "transaksi_id") // foreign key disimpan di tabel pembayaran
    @JsonBackReference
    private Transaksi transaksi;

    @Column(name = "jumlah_pembayaran", nullable = false)
    private Double jumlahPembayaran; // Jumlah uang yang dibayarkan

    @Enumerated(EnumType.STRING)
    @Column(name = "status_pembayaran", nullable = false)
    private StatusPembayaran statusPembayaran; // STATUS: PENDING, LUNAS, GAGAL

    double kembalian; // Kembalian jika jumlah pembayaran lebih besar dari total harga

    // Constructor tanpa parameter (default)
    public Pembayaran() {
    }

    // Constructor dengan semua field
    public Pembayaran(Transaksi transaksi, Double jumlahPembayaran, StatusPembayaran statusPembayaran, double kemb) {
        this.transaksi = transaksi;
        this.jumlahPembayaran = jumlahPembayaran;
        this.statusPembayaran = statusPembayaran;
        this.kembalian = kemb;
    }

    // Getter dan Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Transaksi getTransaksi() {
        return transaksi;
    }

    public void setTransaksi(Transaksi transaksi) {
        this.transaksi = transaksi;
    }

    public Double getJumlahPembayaran() {
        return jumlahPembayaran;
    }

    public void setJumlahPembayaran(Double jumlahPembayaran) {
        this.jumlahPembayaran = jumlahPembayaran;
    }

    public StatusPembayaran getStatusPembayaran() {
        return statusPembayaran;
    }

    public void setStatusPembayaran(StatusPembayaran statusPembayaran) {
        this.statusPembayaran = statusPembayaran;
    }

    public double getKembalian() {
        return kembalian;
    }

    public void setKembalian(double kembalian) {
        this.kembalian = kembalian;
    }

    public enum StatusPembayaran {
        PENDING, // Pembayaran belum selesai
        LUNAS, // Pembayaran berhasil dan selesai
        GAGAL // Pembayaran gagal
    }
}
