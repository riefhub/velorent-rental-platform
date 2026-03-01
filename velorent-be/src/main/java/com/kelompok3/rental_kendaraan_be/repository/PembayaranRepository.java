package com.kelompok3.rental_kendaraan_be.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kelompok3.rental_kendaraan_be.model.Pembayaran;

public interface PembayaranRepository extends JpaRepository<Pembayaran, Long> {
    List<Pembayaran> findByTransaksiId(Long transaksiId);
}
