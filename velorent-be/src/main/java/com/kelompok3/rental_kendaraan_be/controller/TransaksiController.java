package com.kelompok3.rental_kendaraan_be.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kelompok3.rental_kendaraan_be.dto.TransaksiRequest;
import com.kelompok3.rental_kendaraan_be.dto.TransaksiResponseDTO;
import com.kelompok3.rental_kendaraan_be.model.Transaksi;
import com.kelompok3.rental_kendaraan_be.service.TransaksiService;

@RestController
@RequestMapping("/api/transaksi")
public class TransaksiController {

        @Autowired
        private TransaksiService transaksiService;

        @PostMapping
        public ResponseEntity<TransaksiResponseDTO> buatTransaksi(@RequestBody TransaksiRequest request) {
                Transaksi transaksi = transaksiService.buatTransaksi(
                                request.getUserId(),
                                request.getKendaraanId(),
                                java.time.LocalDate.parse(request.getTanggalPeminjaman()),
                                java.time.LocalDate.parse(request.getTanggalPengembalian()));

                TransaksiResponseDTO response = new TransaksiResponseDTO(
                                transaksi.getId(),
                                transaksi.getPenyewa().getId(),
                                transaksi.getKendaraan().getId(),
                                transaksi.getKendaraan().getNama(),
                                transaksi.getKendaraan().getHarga(),
                                transaksi.getTanggalPeminjaman(),
                                transaksi.getTanggalPengembalian(),
                                transaksi.getTotalHarga(),
                                transaksi.getStatusTransaksi().toString(),
                                transaksi.getKendaraan().getGambar());

                return ResponseEntity.ok(response);
        }

        @GetMapping("/{id}")
        public ResponseEntity<TransaksiResponseDTO> getTransaksiById(@PathVariable Long id) {
                Transaksi transaksi = transaksiService.getTransaksiById(id);

                TransaksiResponseDTO response = new TransaksiResponseDTO(
                                transaksi.getId(),
                                transaksi.getPenyewa().getId(),
                                transaksi.getKendaraan().getId(),
                                transaksi.getKendaraan().getNama(),
                                transaksi.getKendaraan().getHarga(),
                                transaksi.getTanggalPeminjaman(),
                                transaksi.getTanggalPengembalian(),
                                transaksi.getTotalHarga(),
                                transaksi.getStatusTransaksi().toString(),
                                transaksi.getKendaraan().getGambar());

                return ResponseEntity.ok(response);
        }

        @GetMapping("/user/{userId}")
        public ResponseEntity<List<TransaksiResponseDTO>> getTransaksiByUserId(@PathVariable Long userId) {
                List<Transaksi> transaksiList = transaksiService.getTransaksiByUserId(userId);

                List<TransaksiResponseDTO> response = transaksiList.stream()
                                .map(transaksi -> new TransaksiResponseDTO(
                                                transaksi.getId(),
                                                transaksi.getPenyewa().getId(),
                                                transaksi.getKendaraan().getId(),
                                                transaksi.getKendaraan().getNama(),
                                                transaksi.getKendaraan().getHarga(),
                                                transaksi.getTanggalPeminjaman(),
                                                transaksi.getTanggalPengembalian(),
                                                transaksi.getTotalHarga(),
                                                transaksi.getStatusTransaksi().toString(),
                                                transaksi.getKendaraan().getGambar()))
                                .collect(Collectors.toList());

                return ResponseEntity.ok(response);
        }

        @GetMapping
        public ResponseEntity<List<TransaksiResponseDTO>> getAllTransaksi() {
                List<Transaksi> transaksiList = transaksiService.getAll();

                List<TransaksiResponseDTO> response = transaksiList.stream()
                                .map(transaksi -> new TransaksiResponseDTO(
                                        transaksi.getId(),
                                        transaksi.getPenyewa().getId(),
                                        transaksi.getKendaraan().getId(),
                                        transaksi.getKendaraan().getNama(),
                                        transaksi.getKendaraan().getHarga(),
                                        transaksi.getTanggalPeminjaman(),
                                        transaksi.getTanggalPengembalian(),                                                transaksi.getTotalHarga(),
                                        transaksi.getStatusTransaksi().toString(),
                                        transaksi.getKendaraan().getGambar()))
                                .collect(Collectors.toList());

                return ResponseEntity.ok(response);
        }

        @PutMapping("/{id}")
        public ResponseEntity<TransaksiResponseDTO> updateTransaksi(
                        @PathVariable Long id,
                        @RequestBody TransaksiRequest request) {
                Transaksi updated = transaksiService.updateTransaksi(
                                id,
                                java.time.LocalDate.parse(request.getTanggalPeminjaman()),
                                java.time.LocalDate.parse(request.getTanggalPengembalian()),
                                request.getTotalHarga());

                TransaksiResponseDTO response = new TransaksiResponseDTO(
                                updated.getId(),
                                updated.getPenyewa().getId(),
                                updated.getKendaraan().getId(),
                                updated.getKendaraan().getNama(),
                                updated.getKendaraan().getHarga(),
                                updated.getTanggalPeminjaman(),
                                updated.getTanggalPengembalian(),
                                updated.getTotalHarga(),
                                updated.getStatusTransaksi().toString(),
                                updated.getKendaraan().getGambar());

                return ResponseEntity.ok(response);
        }

        @PutMapping("/cek-selesai/{id}")
        public ResponseEntity<Map<String, String>> cekTransaksiSelesai(@PathVariable Long id) {
                // Lakukan pengecekan dan update jika perlu
                transaksiService.cekTransaksiSelesai(id);

                // Ambil kembali transaksi setelah pengecekan untuk mendapatkan status terbaru
                Transaksi transaksi = transaksiService.getTransaksiById(id);

                Map<String, String> response = new HashMap<>();
                response.put("statusTransaksi", transaksi.getStatusTransaksi().toString());

                return ResponseEntity.ok(response);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<String> hapusTransaksi(@PathVariable Long id) {
                transaksiService.hapusTransaksi(id);
                return ResponseEntity.ok("Transaksi berhasil dihapus.");
        }
}
