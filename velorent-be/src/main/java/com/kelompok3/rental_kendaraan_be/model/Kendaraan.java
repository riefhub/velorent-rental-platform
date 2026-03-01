package com.kelompok3.rental_kendaraan_be.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;

@Entity
@Table(name = "kendaraan")
@Inheritance(strategy = InheritanceType.JOINED)
public class Kendaraan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nama", nullable = false)
    private String nama;

    @Column(name = "jenis", nullable = false)
    private String jenis;

    @Column(name = "nomor_polisi", nullable = false, unique = true)
    private String nomorPolisi;

    @Column(name = "tahun")
    private Integer tahun;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusKendaraan status;

    @Column(name = "harga")
    private Double harga;

    @Column(name = "jenis_transmisi")
    private String jenisTransmisi;

    @Column(name = "jenis_bahan_bakar")
    private String jenisBahanBakar;

    @Column(name = "gambar")
    private String gambar;

    // Constructor tanpa parameter (default)
    public Kendaraan() {
    }

    // Constructor dengan semua field (kecuali id, karena auto-generated)
    public Kendaraan(String nama, String jenis, String nomorPolisi, Integer tahun, StatusKendaraan status, Double harga, String jenisTransmisi, String jenisBahanBakar, String gambar) {
        this.nama = nama;
        this.jenis = jenis;
        this.nomorPolisi = nomorPolisi;
        this.tahun = tahun;
        this.status = status;
        this.setHarga(harga);
        this.jenisTransmisi = jenisTransmisi;
        this.jenisBahanBakar = jenisBahanBakar;
        this.gambar = gambar;
    }

    // Getter dan Setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getJenis() {
        return jenis;
    }

    public void setJenis(String jenis) {
        this.jenis = jenis;
    }

    public String getNomorPolisi() {
        return nomorPolisi;
    }

    public void setNomorPolisi(String nomorPolisi) {
        this.nomorPolisi = nomorPolisi;
    }

    public Integer getTahun() {
        return tahun;
    }

    public void setTahun(Integer tahun) {
        this.tahun = tahun;
    }

    public StatusKendaraan getStatus() {
        return status;
    }

    public void setStatus(StatusKendaraan status) {
        this.status = status;
    }

    public Double getHarga() {
        return harga;
    }

    public void setHarga(Double harga) {
        if (harga < 0) {
            throw new IllegalArgumentException("Harga kendaraan tidak boleh negatif");
        }
        this.harga = harga;
    }

    public String getJenisTransmisi() {
        return jenisTransmisi;
    }

    public void setJenisTransmisi(String jenisTransmisi) {
        this.jenisTransmisi = jenisTransmisi;
    }

    public String getJenisBahanBakar() {
        return jenisBahanBakar;
    }

    public void setJenisBahanBakar(String jenisBahanBakar) {
        this.jenisBahanBakar = jenisBahanBakar;
    }

    public String getGambar() {
        return gambar;
    }

    public void setGambar(String gambar) {
        this.gambar = gambar;
    }

    // Enum untuk status kendaraan
    public enum StatusKendaraan {
        TERSEDIA,
        DISEWA,
        TIDAK_TERSEDIA
    }
}
