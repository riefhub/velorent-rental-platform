package com.kelompok3.rental_kendaraan_be.repository;

import com.kelompok3.rental_kendaraan_be.model.Motor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotorRepository extends JpaRepository<Motor, Long> {

}
