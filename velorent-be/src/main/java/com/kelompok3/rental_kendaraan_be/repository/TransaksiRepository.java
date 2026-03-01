package com.kelompok3.rental_kendaraan_be.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kelompok3.rental_kendaraan_be.model.Transaksi;

@Repository
public interface TransaksiRepository extends JpaRepository<Transaksi, Long> {

    // Cari transaksi berdasarkan user ID dan status transaksi
    Optional<Transaksi> findByPenyewa_IdAndStatusTransaksi(Long userId, Transaksi.StatusTransaksi statusTransaksi);

    // Cari transaksi berdasarkan kendaraan ID dan status transaksi
    Optional<Transaksi> findByKendaraan_IdAndStatusTransaksi(Long kendaraanId, Transaksi.StatusTransaksi statusTransaksi);

    // Cari semua transaksi berdasarkan status transaksi
    List<Transaksi> findByStatusTransaksi(Transaksi.StatusTransaksi statusTransaksi);

    boolean existsByPenyewa_IdAndStatusTransaksiNot(Long userId, Transaksi.StatusTransaksi statusTransaksi);
    List<Transaksi> findByPenyewaId(Long penyewaId);
}