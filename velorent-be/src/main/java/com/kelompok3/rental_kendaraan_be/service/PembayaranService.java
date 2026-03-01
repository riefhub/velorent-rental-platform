package com.kelompok3.rental_kendaraan_be.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kelompok3.rental_kendaraan_be.model.Kendaraan;
import com.kelompok3.rental_kendaraan_be.model.Pembayaran;
import com.kelompok3.rental_kendaraan_be.model.Transaksi;
import com.kelompok3.rental_kendaraan_be.repository.PembayaranRepository;
import com.kelompok3.rental_kendaraan_be.repository.TransaksiRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PembayaranService {

    @Autowired
    private PembayaranRepository pembayaranRepository;

    @Autowired
    private TransaksiRepository transaksiRepository;

    public Pembayaran createPembayaran(Long transaksiId, Double jumlahBayar) {
        if (jumlahBayar == null || jumlahBayar < 0) {
            throw new IllegalArgumentException("Jumlah pembayaran tidak boleh kosong atau negatif.");
        }

        Transaksi transaksi = transaksiRepository.findById(transaksiId)
                .orElseThrow(() -> new EntityNotFoundException("Transaksi tidak ditemukan."));

        if (transaksi.getPembayaran() != null
                && transaksi.getPembayaran().getStatusPembayaran() == Pembayaran.StatusPembayaran.LUNAS) {
            throw new IllegalStateException("Transaksi ini sudah memiliki pembayaran lunas.");
        }

        double totalHarga = transaksi.getTotalHarga();
        Pembayaran pembayaran = transaksi.getPembayaran();

        if (pembayaran == null) {
            pembayaran = new Pembayaran();
            pembayaran.setTransaksi(transaksi);
        }

        pembayaran.setJumlahPembayaran(jumlahBayar);

        if (jumlahBayar >= totalHarga) {
            pembayaran.setStatusPembayaran(Pembayaran.StatusPembayaran.LUNAS);
            transaksi.setStatusTransaksi(Transaksi.StatusTransaksi.SEDANG_SEWA);
            pembayaran.setKembalian(jumlahBayar - totalHarga);

            Kendaraan kendaraan = transaksi.getKendaraan();
            if (kendaraan != null) {
                kendaraan.setStatus(Kendaraan.StatusKendaraan.DISEWA);
            }
        } else {
            pembayaran.setStatusPembayaran(Pembayaran.StatusPembayaran.PENDING);
        }

        Pembayaran savedPembayaran = pembayaranRepository.save(pembayaran);
        transaksi.setPembayaran(savedPembayaran);
        transaksiRepository.save(transaksi);

        return savedPembayaran;
    }

    public List<Pembayaran> getAllPembayaran() {
        return pembayaranRepository.findAll();
    }

    public Pembayaran getPembayaranById(Long id) {
        return pembayaranRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pembayaran tidak ditemukan."));
    }

    public Pembayaran updatePembayaran(Long id, Double jumlahBayar) {
        if (jumlahBayar == null || jumlahBayar < 0) {
            throw new IllegalArgumentException("Jumlah pembayaran tidak boleh kosong atau negatif.");
        }

        Pembayaran pembayaran = pembayaranRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pembayaran tidak ditemukan."));

        Transaksi transaksi = pembayaran.getTransaksi();
        double totalHarga = transaksi.getTotalHarga();

        pembayaran.setJumlahPembayaran(jumlahBayar);

        if (jumlahBayar >= totalHarga) {
            pembayaran.setStatusPembayaran(Pembayaran.StatusPembayaran.LUNAS);
            transaksi.setStatusTransaksi(Transaksi.StatusTransaksi.SEDANG_SEWA);
            pembayaran.setKembalian(jumlahBayar - totalHarga);

            Kendaraan kendaraan = transaksi.getKendaraan();
            if (kendaraan != null) {
                kendaraan.setStatus(Kendaraan.StatusKendaraan.DISEWA);
            }
        } else {
            pembayaran.setStatusPembayaran(Pembayaran.StatusPembayaran.PENDING);
        }

        pembayaranRepository.save(pembayaran);
        transaksiRepository.save(transaksi);

        return pembayaran;
    }

    public void deletePembayaran(Long id) {
        if (!pembayaranRepository.existsById(id)) {
            throw new EntityNotFoundException("Pembayaran tidak ditemukan.");
        }
        Pembayaran pembayaran = pembayaranRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pembayaran tidak ditemukan."));

        if (pembayaran.getStatusPembayaran() == Pembayaran.StatusPembayaran.LUNAS) {
            Transaksi transaksi = pembayaran.getTransaksi();
            transaksi.setStatusTransaksi(Transaksi.StatusTransaksi.PENDING);
            transaksiRepository.save(transaksi);
        }

        pembayaranRepository.deleteById(id);
    }

    public Pembayaran getPembayaranByTransaksiId(Long transaksiId) {
        Transaksi transaksi = transaksiRepository.findById(transaksiId)
                .orElseThrow(() -> new EntityNotFoundException("Transaksi tidak ditemukan."));
        return transaksi.getPembayaran();
    }
}
