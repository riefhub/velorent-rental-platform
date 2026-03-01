package com.kelompok3.rental_kendaraan_be.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "motor")
public class Motor extends Kendaraan {

    @Column(name = "tipe_motor")
    private String tipeMotor;

    @Column(name = "kapasitas_mesin")
    private Integer kapasitasMesin;

    // Constructor tanpa parameter (default)
    public Motor() {
        super();
    }

    // Constructor dengan semua field (termasuk field dari superclass)
    public Motor(String nama, String jenis, String nomorPolisi, Integer tahun, StatusKendaraan status, Double harga, String jenisTransmisi, String jenisBahanBakar, String tipeMotor, Integer kapasitasMesin, String gambar) {
        super(nama, jenis, nomorPolisi, tahun, status, harga, jenisTransmisi, jenisBahanBakar, gambar);
        this.tipeMotor = tipeMotor;
        this.kapasitasMesin = kapasitasMesin;
    }

    // Getter dan Setter untuk tipeMotor
    public String getTipeMotor() {
        return tipeMotor;
    }

    public void setTipeMotor(String tipeMotor) {
        this.tipeMotor = tipeMotor;
    }

    // Getter dan Setter untuk kapasitasMesin
    public Integer getKapasitasMesin() {
        return kapasitasMesin;
    }

    public void setKapasitasMesin(Integer kapasitasMesin) {
        this.kapasitasMesin = kapasitasMesin;
    }
}
