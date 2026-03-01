package com.kelompok3.rental_kendaraan_be.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Folder untuk gambar mobil
        Path mobilDir = Paths.get("public/uploads/mobil");
        String mobilPath = mobilDir.toFile().getAbsolutePath();

        // Folder untuk gambar motor
        Path motorDir = Paths.get("public/uploads/motor");
        String motorPath = motorDir.toFile().getAbsolutePath();

        // Mapping URL ke folder fisik
        registry.addResourceHandler("/uploads/mobil/**")
                .addResourceLocations("file:///" + mobilPath.replace("\\", "/") + "/");

        registry.addResourceHandler("/uploads/motor/**")
                .addResourceLocations("file:///" + motorPath.replace("\\", "/") + "/");
    }
}
