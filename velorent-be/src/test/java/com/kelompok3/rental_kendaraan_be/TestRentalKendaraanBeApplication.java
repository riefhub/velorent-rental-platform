package com.kelompok3.rental_kendaraan_be;

import org.springframework.boot.SpringApplication;

public class TestRentalKendaraanBeApplication {

	public static void main(String[] args) {
		SpringApplication.from(RentalKendaraanBeApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
