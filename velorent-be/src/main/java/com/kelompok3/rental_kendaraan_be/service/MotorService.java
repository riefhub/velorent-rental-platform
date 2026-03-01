package com.kelompok3.rental_kendaraan_be.service;

import com.kelompok3.rental_kendaraan_be.model.Motor;
import com.kelompok3.rental_kendaraan_be.repository.MotorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MotorService {

    @Autowired
    private MotorRepository motorRepository;

    public List<Motor> getAllMotor() {
        return motorRepository.findAll();
    }

    public Optional<Motor> getMotorById(Long id) {
        return motorRepository.findById(id);
    }

    public Motor saveMotor(Motor motor) {
        return motorRepository.save(motor);
    }

    public Motor updateMotor(Long id, Motor motor) {
        Motor existingMotor = motorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Motor not found with id: " + id));

        if (motor.getNama() != null) existingMotor.setNama(motor.getNama());
        if (motor.getJenis() != null) existingMotor.setJenis(motor.getJenis());
        if (motor.getNomorPolisi() != null) existingMotor.setNomorPolisi(motor.getNomorPolisi());
        if (motor.getTahun() != null) existingMotor.setTahun(motor.getTahun());
        if (motor.getStatus() != null) existingMotor.setStatus(motor.getStatus());
        if (motor.getHarga() != null) existingMotor.setHarga(motor.getHarga());
        if (motor.getJenisTransmisi() != null) existingMotor.setJenisTransmisi(motor.getJenisTransmisi());
        if (motor.getJenisBahanBakar() != null) existingMotor.setJenisBahanBakar(motor.getJenisBahanBakar());
        if (motor.getGambar() != null) existingMotor.setGambar(motor.getGambar());
        if (motor.getTipeMotor() != null) existingMotor.setTipeMotor(motor.getTipeMotor());
        if (motor.getKapasitasMesin() != null) existingMotor.setKapasitasMesin(motor.getKapasitasMesin());

        return motorRepository.save(existingMotor);
    }

    public void deleteMotor(Long id) {
        motorRepository.deleteById(id);
    }
}
