package com.kelompok3.rental_kendaraan_be.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "mobil")
public class Mobil extends Kendaraan {

    @Column(name = "tipe_mobil")
    private String tipeMobil;

    @Column(name = "kapasitas")
    private int kapasitas;

    // Constructor tanpa parameter (default)
    public Mobil() {
        super();
    }

    // Constructor dengan semua field (termasuk field dari superclass)
    public Mobil(String nama, String jenis, String nomorPolisi, Integer tahun, StatusKendaraan status, Double harga, String jenisTransmisi, String jenisBahanBakar, String tipeMobil, int kapasitas, String gambar) {
        super(nama, jenis, nomorPolisi, tahun, status, harga, jenisTransmisi, jenisBahanBakar, gambar);
        this.tipeMobil = tipeMobil;
        this.setKapasitas(kapasitas);
    }

    // Getter dan Setter untuk tipeMobil
    public String getTipeMobil() {
        return tipeMobil;
    }

    public void setTipeMobil(String tipeMobil) {
        this.tipeMobil = tipeMobil;
    }

    // Getter dan Setter untuk kapasitas
    public int getKapasitas() {
        return kapasitas;
    }

    public void setKapasitas(int kapasitas) {
        if (kapasitas < 0) {
            throw new IllegalArgumentException("Kapasitas mobil tidak boleh negatif");
        }
        this.kapasitas = kapasitas;
    }
}
