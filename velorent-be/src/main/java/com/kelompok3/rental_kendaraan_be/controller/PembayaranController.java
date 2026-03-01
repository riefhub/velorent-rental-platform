package com.kelompok3.rental_kendaraan_be.controller;

import java.util.List;

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

import com.kelompok3.rental_kendaraan_be.dto.PembayaranRequest;
import com.kelompok3.rental_kendaraan_be.model.Pembayaran;
import com.kelompok3.rental_kendaraan_be.service.PembayaranService;

@RestController
@RequestMapping("/api/pembayaran")
public class PembayaranController {

    @Autowired
    private PembayaranService pembayaranService;

    // DTO untuk request body


    @PostMapping
    public ResponseEntity<Pembayaran> createPembayaran(@RequestBody PembayaranRequest request) {
        Pembayaran pembayaran = pembayaranService.createPembayaran(request.transaksiId, request.jumlahBayar);
        return ResponseEntity.ok(pembayaran);
    }

    @GetMapping
    public ResponseEntity<List<Pembayaran>> getAllPembayaran() {
        return ResponseEntity.ok(pembayaranService.getAllPembayaran());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pembayaran> getPembayaranById(@PathVariable Long id) {
        return ResponseEntity.ok(pembayaranService.getPembayaranById(id));
    }

    @GetMapping("/transaksi/{transaksiId}")
    public ResponseEntity<Pembayaran> getPembayaranByTransaksiId(@PathVariable Long transaksiId) {
        return ResponseEntity.ok(pembayaranService.getPembayaranByTransaksiId(transaksiId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pembayaran> updatePembayaran(
            @PathVariable Long id,
            @RequestBody PembayaranRequest request
    ) {
        Pembayaran updated = pembayaranService.updatePembayaran(id, request.jumlahBayar);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePembayaran(@PathVariable Long id) {
        pembayaranService.deletePembayaran(id);
        return ResponseEntity.ok("Pembayaran berhasil dihapus.");
    }
}
