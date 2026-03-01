package com.kelompok3.rental_kendaraan_be.controller;

import com.kelompok3.rental_kendaraan_be.model.Kendaraan;
import com.kelompok3.rental_kendaraan_be.service.KendaraanService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/kendaraan")
public class KendaraanController {

    @Autowired
    private KendaraanService kendaraanService;

    @GetMapping
    public List<Kendaraan> getAllKendaraan() {
        return kendaraanService.getAllKendaraan();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kendaraan> getKendaraanById(@PathVariable Long id) {
        Optional<Kendaraan> kendaraan = kendaraanService.getKendaraanById(id);
        return kendaraan.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public Kendaraan createKendaraan(@RequestBody Kendaraan kendaraan) {
        return kendaraanService.saveKendaraan(kendaraan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kendaraan> updateKendaraan(@PathVariable Long id, @RequestBody Kendaraan kendaraan) {
        try {
            Kendaraan updatedKendaraan = kendaraanService.updateKendaraan(id, kendaraan);
            return ResponseEntity.ok(updatedKendaraan);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteKendaraan(@PathVariable Long id) {
        kendaraanService.deleteKendaraan(id);
    }
}

