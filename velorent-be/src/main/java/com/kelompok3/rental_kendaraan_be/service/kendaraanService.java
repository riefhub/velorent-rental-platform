package com.kelompok3.rental_kendaraan_be.service;

import com.kelompok3.rental_kendaraan_be.model.Kendaraan;
import com.kelompok3.rental_kendaraan_be.repository.KendaraanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KendaraanService {

    @Autowired
    private KendaraanRepository kendaraanRepository;

    public List<Kendaraan> getAllKendaraan() {
        return kendaraanRepository.findAll();
    }

    public Optional<Kendaraan> getKendaraanById(Long id) {
        return kendaraanRepository.findById(id);
    }

    public Kendaraan saveKendaraan(Kendaraan kendaraan) {
        return kendaraanRepository.save(kendaraan);
    }

    public Kendaraan updateKendaraan(Long id, Kendaraan kendaraan) {
        Kendaraan existing = kendaraanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Kendaraan not found with id: " + id));

        if (kendaraan.getNama() != null) existing.setNama(kendaraan.getNama());
        if (kendaraan.getJenis() != null) existing.setJenis(kendaraan.getJenis());
        if (kendaraan.getNomorPolisi() != null) existing.setNomorPolisi(kendaraan.getNomorPolisi());
        if (kendaraan.getTahun() != null) existing.setTahun(kendaraan.getTahun());
        if (kendaraan.getStatus() != null) existing.setStatus(kendaraan.getStatus());
        if (kendaraan.getHarga() != null) existing.setHarga(kendaraan.getHarga());
        if (kendaraan.getJenisTransmisi() != null) existing.setJenisTransmisi(kendaraan.getJenisTransmisi());
        if (kendaraan.getJenisBahanBakar() != null) existing.setJenisBahanBakar(kendaraan.getJenisBahanBakar());
        if (kendaraan.getGambar() != null) existing.setGambar(kendaraan.getGambar());

        return kendaraanRepository.save(existing);
    }

    public void deleteKendaraan(Long id) {
        kendaraanRepository.deleteById(id);
    }
}
