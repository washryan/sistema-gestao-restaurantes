package com.restaurante;

import java.net.URI;
import java.net.URISyntaxException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestauranteApplication {

    public static void main(String[] args) {
        configureRenderDatabaseUrl();
        SpringApplication.run(RestauranteApplication.class, args);
    }

    private static void configureRenderDatabaseUrl() {
        String existingJdbcUrl = System.getProperty("spring.datasource.url");
        if (existingJdbcUrl != null && !existingJdbcUrl.isBlank()) {
            return;
        }

        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl == null || databaseUrl.isBlank()) {
            return;
        }

        try {
            URI uri = new URI(databaseUrl);
            String host = uri.getHost();
            int port = uri.getPort() > 0 ? uri.getPort() : 5432;
            String path = uri.getPath() != null ? uri.getPath().replaceFirst("/", "") : "";
            String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s", host, port, path);
            System.setProperty("spring.datasource.url", jdbcUrl);
        } catch (URISyntaxException exception) {
            throw new IllegalStateException("Invalid DATABASE_URL value for PostgreSQL", exception);
        }
    }
}
