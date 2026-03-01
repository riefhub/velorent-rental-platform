package com.kelompok3.rental_kendaraan_be.service;

import com.kelompok3.rental_kendaraan_be.model.Mobil;
import com.kelompok3.rental_kendaraan_be.repository.MobilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MobilService {

    @Autowired
    private MobilRepository mobilRepository;

    public List<Mobil> getAllMobil() {
        return mobilRepository.findAll();
    }

    public Optional<Mobil> getMobilById(Long id) {
        return mobilRepository.findById(id);
    }

    public Mobil saveMobil(Mobil mobil) {
        return mobilRepository.save(mobil);
    }

    public Mobil updateMobil(Long id, Mobil mobil) {
        Mobil existingMobil = mobilRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mobil not found with id: " + id));

        if (mobil.getNama() != null) existingMobil.setNama(mobil.getNama());
        if (mobil.getJenis() != null) existingMobil.setJenis(mobil.getJenis());
        if (mobil.getNomorPolisi() != null) existingMobil.setNomorPolisi(mobil.getNomorPolisi());
        if (mobil.getTahun() != null) existingMobil.setTahun(mobil.getTahun());
        if (mobil.getStatus() != null) existingMobil.setStatus(mobil.getStatus());
        if (mobil.getHarga() != null) existingMobil.setHarga(mobil.getHarga());
        if (mobil.getJenisTransmisi() != null) existingMobil.setJenisTransmisi(mobil.getJenisTransmisi());
        if (mobil.getJenisBahanBakar() != null) existingMobil.setJenisBahanBakar(mobil.getJenisBahanBakar());
        if (mobil.getGambar() != null) existingMobil.setGambar(mobil.getGambar());

        if (mobil.getTipeMobil() != null) existingMobil.setTipeMobil(mobil.getTipeMobil());
        if (mobil.getKapasitas() != 0) existingMobil.setKapasitas(mobil.getKapasitas());
       

        return mobilRepository.save(existingMobil);     
    }

    public void deleteMobil(Long id) {
        mobilRepository.deleteById(id);
    }
}
