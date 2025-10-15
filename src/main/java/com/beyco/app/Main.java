package com.beyco.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/**
 * Esta anotación @SpringBootApplication combina tres anotaciones:
 * @Configuration: Marca la clase como una fuente de definiciones de beans.
 * @EnableAutoConfiguration: Le dice a Spring Boot que empiece a añadir beans basados en la configuración del classpath.
 * @ComponentScan: Le dice a Spring que busque otros componentes, configuraciones y servicios en el paquete com.beyco.app.
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.beyco.app")
public class Main {

    public static void main(String[] args) {
        // Esta única línea inicia toda la aplicación Spring Boot.
        // Crea el servidor, configura los servicios y pone todo en marcha.
        SpringApplication.run(Main.class, args);
    }

}