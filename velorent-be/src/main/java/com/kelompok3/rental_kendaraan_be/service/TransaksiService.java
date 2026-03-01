package com.kelompok3.rental_kendaraan_be.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kelompok3.rental_kendaraan_be.model.Kendaraan;
import com.kelompok3.rental_kendaraan_be.model.Pembayaran;
import com.kelompok3.rental_kendaraan_be.model.Transaksi;
import com.kelompok3.rental_kendaraan_be.model.User;
import com.kelompok3.rental_kendaraan_be.repository.KendaraanRepository;
import com.kelompok3.rental_kendaraan_be.repository.PembayaranRepository;
import com.kelompok3.rental_kendaraan_be.repository.TransaksiRepository;
import com.kelompok3.rental_kendaraan_be.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class TransaksiService {

    @Autowired
    private TransaksiRepository transaksiRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KendaraanRepository kendaraanRepository;

    @Autowired
    private PembayaranRepository pembayaranRepository;

    // Membuat transaksi baru
    public Transaksi buatTransaksi(Long userId, Long kendaraanId, LocalDate tanggalPeminjaman,
                                   LocalDate tanggalPengembalian) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        boolean sudahPunyaTransaksi = transaksiRepository.existsByPenyewa_IdAndStatusTransaksiNot(
                userId, Transaksi.StatusTransaksi.SELESAI);

        if (sudahPunyaTransaksi) {
            throw new RuntimeException("User masih memiliki transaksi aktif.");
        }

        Kendaraan kendaraan = kendaraanRepository.findById(kendaraanId)
                .orElseThrow(() -> new RuntimeException("Kendaraan tidak ditemukan"));

        if (kendaraan.getStatus() != Kendaraan.StatusKendaraan.TERSEDIA) {
            throw new RuntimeException("Kendaraan tidak tersedia.");
        }

        long durasiHari = ChronoUnit.DAYS.between(tanggalPeminjaman, tanggalPengembalian);
        if (durasiHari <= 0)
            throw new RuntimeException("Durasi sewa tidak valid.");

        double totalHarga = kendaraan.getHarga() * durasiHari;

        // Buat transaksi
        Transaksi transaksi = new Transaksi();
        transaksi.setPenyewa(user);
        transaksi.setKendaraan(kendaraan);
        transaksi.setTanggalPeminjaman(tanggalPeminjaman);
        transaksi.setTanggalPengembalian(tanggalPengembalian);
        transaksi.setTotalHarga(totalHarga);
        transaksi.setStatusTransaksi(Transaksi.StatusTransaksi.PENDING);

        transaksi = transaksiRepository.save(transaksi);

        // Buat entitas pembayaran terkait transaksi
        Pembayaran pembayaran = new Pembayaran();
        pembayaran.setTransaksi(transaksi);
        pembayaran.setJumlahPembayaran(0.0);
        pembayaran.setStatusPembayaran(Pembayaran.StatusPembayaran.PENDING);

        pembayaran = pembayaranRepository.save(pembayaran);

        // Hubungkan transaksi dengan pembayaran
        transaksi.setPembayaran(pembayaran);

        return transaksi;
    }

    public List<Transaksi> getTransaksiByUserId(Long userId) {
        return transaksiRepository.findByPenyewaId(userId);
    }

    // Mendapatkan transaksi berdasarkan ID
    public Transaksi getTransaksiById(Long id) {
        return transaksiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaksi tidak ditemukan"));
    }

    // Mendapatkan semua transaksi
    public List<Transaksi> getAll() {
        return transaksiRepository.findAll();
    }

    // Update data transaksi (misal admin mengedit tanggal)
    public Transaksi updateTransaksi(Long id, LocalDate tanggalPeminjaman,
                                     LocalDate tanggalPengembalian, Double totalHarga) {
        Transaksi transaksi = transaksiRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaksi tidak ditemukan"));

        transaksi.setTanggalPeminjaman(tanggalPeminjaman);
        transaksi.setTanggalPengembalian(tanggalPengembalian);
        transaksi.setTotalHarga(totalHarga);

        return transaksiRepository.save(transaksi);
    }

    // Mengecek apakah transaksi sudah selesai berdasarkan tanggal
    @Transactional
    public void cekTransaksiSelesai(Long transaksiId) {
        Transaksi transaksi = transaksiRepository.findById(transaksiId)
                .orElseThrow(() -> new RuntimeException("Transaksi tidak ditemukan"));

        LocalDate sekarang = LocalDate.now();
        if (!sekarang.isBefore(transaksi.getTanggalPengembalian())
                && transaksi.getStatusTransaksi() == Transaksi.StatusTransaksi.SEDANG_SEWA) {
            transaksi.setStatusTransaksi(Transaksi.StatusTransaksi.SELESAI);

            Kendaraan kendaraan = transaksi.getKendaraan();
            kendaraan.setStatus(Kendaraan.StatusKendaraan.TERSEDIA);

            transaksiRepository.save(transaksi);
            kendaraanRepository.save(kendaraan);
        }
    }

    // Menghapus transaksi berdasarkan ID
    public void hapusTransaksi(Long id) {
        transaksiRepository.deleteById(id);
    }
}
