package com.beyco.app.db;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.sql.Connection;
import java.sql.DriverManager;

@Configuration
public class Database {

    @Bean
    public Connection databaseConnection() {
        String url = "jdbc:mysql://localhost:3307/mydb";
        String user = "admin";
        String password = "admin";
        String driver = "com.mysql.cj.jdbc.Driver";
        Connection connection = null;

        try {
            Class.forName(driver);
            connection = DriverManager.getConnection(url, user, password);
            System.out.println("Bean de Conexión a BD creado por Spring.");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return connection;
    }
}