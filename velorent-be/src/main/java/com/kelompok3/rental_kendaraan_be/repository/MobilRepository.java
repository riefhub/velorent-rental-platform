package com.kelompok3.rental_kendaraan_be.repository;

import com.kelompok3.rental_kendaraan_be.model.Mobil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MobilRepository extends JpaRepository<Mobil, Long> {

}
