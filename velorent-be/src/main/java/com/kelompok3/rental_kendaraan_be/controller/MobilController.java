package com.kelompok3.rental_kendaraan_be.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kelompok3.rental_kendaraan_be.model.Kendaraan;
import com.kelompok3.rental_kendaraan_be.model.Mobil;
import com.kelompok3.rental_kendaraan_be.service.MobilService;

@RestController
@RequestMapping("/api/mobil")
public class MobilController {

    @Autowired
    private MobilService mobilService;

    @GetMapping
    public List<Mobil> getAllMobil() {
        return mobilService.getAllMobil();
    }

    @GetMapping("/{id}")
    public Optional<Mobil> getMobilById(@PathVariable Long id) {
        return mobilService.getMobilById(id);
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Mobil> createMobil(
            @RequestParam("gambar") MultipartFile file,
            @RequestParam("nama") String nama,
            @RequestParam("nomorPolisi") String nomorPolisi,
            @RequestParam("tahun") Integer tahun,
            @RequestParam("status") String status,
            @RequestParam("harga") Double harga,
            @RequestParam("jenisTransmisi") String jenisTransmisi,
            @RequestParam("jenisBahanBakar") String jenisBahanBakar,
            @RequestParam("tipeMobil") String tipeMobil,
            @RequestParam("kapasitas") int kapasitas){

        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = "public/uploads/mobil/" + fileName;
            Path path = Paths.get(filePath);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            Mobil mobil = new Mobil();
            mobil.setNama(nama);
            mobil.setJenis("Mobil");
            mobil.setNomorPolisi(nomorPolisi);
            mobil.setTahun(tahun);
            mobil.setStatus(Kendaraan.StatusKendaraan.valueOf(status));
            mobil.setHarga(harga);
            mobil.setJenisTransmisi(jenisTransmisi);
            mobil.setJenisBahanBakar(jenisBahanBakar);
            mobil.setTipeMobil(tipeMobil);
            mobil.setKapasitas(kapasitas);
            mobil.setGambar("/uploads/mobil/" + fileName);

            Mobil saved = mobilService.saveMobil(mobil);
            return ResponseEntity.ok(saved);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Mobil> updateMobil(
            @PathVariable Long id,
            @RequestParam(value = "gambar", required = false) MultipartFile file,
            @RequestParam(value = "nama", required = false) String nama,
            @RequestParam(value = "nomorPolisi", required = false) String nomorPolisi,
            @RequestParam(value = "tahun", required = false) Integer tahun,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "harga", required = false) Double harga,
            @RequestParam(value = "jenisTransmisi", required = false) String jenisTransmisi,
            @RequestParam(value = "jenisBahanBakar", required = false) String jenisBahanBakar,
            @RequestParam(value = "tipeMobil", required = false) String tipeMobil,
            @RequestParam(value = "kapasitas", required = false) Integer kapasitas) {

        try {
            Mobil existing = mobilService.getMobilById(id)
                    .orElseThrow(() -> new RuntimeException("Mobil tidak ditemukan"));

            // Handle gambar jika ada
            if (file != null && !file.isEmpty()) {
                // Hapus gambar lama jika ada
                if (existing.getGambar() != null && !existing.getGambar().isEmpty()) {
                    String oldPathStr = "public" + existing.getGambar();
                    Path oldPath = Paths.get(oldPathStr);
                    Files.deleteIfExists(oldPath);
                }

                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                String filePath = "public/uploads/mobil/" + fileName;
                Path path = Paths.get(filePath);
                Files.createDirectories(path.getParent());
                Files.write(path, file.getBytes());

                existing.setGambar("/uploads/mobil/" + fileName);
            }

            if (nama != null) existing.setNama(nama);
            if (nomorPolisi != null) existing.setNomorPolisi(nomorPolisi);
            if (tahun != null) existing.setTahun(tahun);
            if (status != null) existing.setStatus(Kendaraan.StatusKendaraan.valueOf(status));
            if (harga != null) existing.setHarga(harga);
            if (jenisTransmisi != null) existing.setJenisTransmisi(jenisTransmisi);
            if (jenisBahanBakar != null) existing.setJenisBahanBakar(jenisBahanBakar);
            if (tipeMobil != null) existing.setTipeMobil(tipeMobil);
            if (kapasitas != null) existing.setKapasitas(kapasitas);

            Mobil updated = mobilService.saveMobil(existing);
            return ResponseEntity.ok(updated);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMobil(@PathVariable Long id) {
        Optional<Mobil> mobil = mobilService.getMobilById(id);
        if (mobil.isPresent()) {
            // Hapus file gambar jika ada
            if (mobil.get().getGambar() != null && !mobil.get().getGambar().isEmpty()) {
                String oldPathStr = "public" + mobil.get().getGambar();
                try {
                    Files.deleteIfExists(Paths.get(oldPathStr));
                } catch (IOException ignored) {}
            }
            mobilService.deleteMobil(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
