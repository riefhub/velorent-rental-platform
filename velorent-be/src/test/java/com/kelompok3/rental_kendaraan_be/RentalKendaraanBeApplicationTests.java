package com.kelompok3.rental_kendaraan_be;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class RentalKendaraanBeApplicationTests {

	@Test
	void contextLoads() {
	}

}
