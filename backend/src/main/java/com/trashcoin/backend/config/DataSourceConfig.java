package com.trashcoin.backend.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        // If DATABASE_URL is provided (Render deployment)
        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            // Convert Render's postgresql:// to jdbc:postgresql://
            if (databaseUrl.startsWith("postgres://")) {
                databaseUrl = databaseUrl.replace("postgres://", "jdbc:postgresql://");
            } else if (databaseUrl.startsWith("postgresql://")) {
                databaseUrl = "jdbc:" + databaseUrl;
            }
            
            // Build DataSource with converted URL
            return DataSourceBuilder.create()
                    .url(databaseUrl)
                    .build();
        }
        
        // For local development, use application.properties defaults
        return DataSourceBuilder.create()
                .url("jdbc:mysql://localhost:3307/trashcoin_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true")
                .username("root")
                .password("rootpassword")
                .build();
    }
}
