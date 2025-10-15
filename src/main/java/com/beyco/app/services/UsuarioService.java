package com.beyco.app.services;

import com.beyco.app.models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {

    private final Connection connection;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsuarioService(Connection connection, PasswordEncoder passwordEncoder) {
        this.connection = connection;
        this.passwordEncoder = passwordEncoder;
    }

    // --- MÉTODO NUEVO PARA OBTENER INSTRUCTORES ---
    public List<Usuario> listarInstructores() {
        List<Usuario> instructores = new ArrayList<>();
        String sql = "SELECT Num_Empleado, Nombre, Apellido_paterno, Apellido_materno FROM usuarios WHERE Id_Rol = 2";

        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Usuario instructor = new Usuario();
                instructor.setNumEmpleado(rs.getInt("Num_Empleado"));
                instructor.setNombre(rs.getString("Nombre"));
                instructor.setApellidoPaterno(rs.getString("Apellido_paterno"));
                instructor.setApellidoMaterno(rs.getString("Apellido_materno"));
                instructores.add(instructor);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return instructores;
    }

    // --- MÉTODOS PARA RECUPERACIÓN DE CONTRASEÑA ---

    public String getPreguntaSeguridadPorCorreo(String correo) {
        String sql = "SELECT Pregunta_recuperacion FROM usuarios WHERE Correo = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, correo);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                return rs.getString("Pregunta_recuperacion");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean verificarRespuestaSeguridad(String correo, String respuesta) {
        String sql = "SELECT 1 FROM usuarios WHERE Correo = ? AND Respuesta_recuperacion = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, correo);
            pstmt.setString(2, respuesta);
            ResultSet rs = pstmt.executeQuery();
            return rs.next(); // Devuelve true si encuentra una coincidencia
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean actualizarContrasena(String correo, String nuevaContrasena) {
        String contrasenaHasheada = passwordEncoder.encode(nuevaContrasena);
        String sql = "UPDATE usuarios SET Contrasena = ? WHERE Correo = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, contrasenaHasheada);
            pstmt.setString(2, correo);
            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    // --- MÉTODO DE AUTENTICACIÓN ---
    public Usuario autenticarYObtenerUsuario(String correo, String contrasenaPlana) {
        String sql = "SELECT * FROM usuarios WHERE Correo = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, correo);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                String contrasenaHasheada = rs.getString("Contrasena");
                if (passwordEncoder.matches(contrasenaPlana, contrasenaHasheada)) {
                    Usuario usuario = new Usuario();
                    usuario.setNumEmpleado(rs.getInt("Num_Empleado"));
                    usuario.setNombre(rs.getString("Nombre"));
                    usuario.setApellidoPaterno(rs.getString("Apellido_paterno"));
                    usuario.setApellidoMaterno(rs.getString("Apellido_materno"));
                    usuario.setCorreo(rs.getString("Correo"));
                    usuario.setIdRol(rs.getInt("Id_Rol"));
                    usuario.setActivo(rs.getBoolean("Activo"));
                    usuario.setFechaIngreso(rs.getDate("Fecha_Ingreso").toLocalDate());
                    return usuario;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // --- MÉTODOS CRUD ---

    public List<Usuario> listarUsuarios() {
        List<Usuario> usuarios = new ArrayList<>();
        String sql = "SELECT * FROM usuarios";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                Usuario usuario = new Usuario();
                usuario.setNumEmpleado(rs.getInt("Num_Empleado"));
                usuario.setNombre(rs.getString("Nombre"));
                usuario.setApellidoPaterno(rs.getString("Apellido_paterno"));
                usuario.setApellidoMaterno(rs.getString("Apellido_materno"));
                usuario.setCorreo(rs.getString("Correo"));
                usuario.setIdRol(rs.getInt("Id_Rol"));
                usuario.setActivo(rs.getBoolean("Activo"));
                usuario.setFechaIngreso(rs.getDate("Fecha_Ingreso").toLocalDate());
                usuario.setFirma(rs.getString("Firma"));
                usuarios.add(usuario);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return usuarios;
    }

    public boolean crearUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuarios (Nombre, Apellido_paterno, Apellido_materno, Correo, Contrasena, Id_Rol, Activo, Fecha_Ingreso, Pregunta_recuperacion, Respuesta_recuperacion, Firma) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        String contrasenaHasheada = passwordEncoder.encode(usuario.getContrasena());
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, usuario.getNombre());
            pstmt.setString(2, usuario.getApellidoPaterno());
            pstmt.setString(3, usuario.getApellidoMaterno());
            pstmt.setString(4, usuario.getCorreo());
            pstmt.setString(5, contrasenaHasheada);
            pstmt.setInt(6, usuario.getIdRol());
            pstmt.setBoolean(7, usuario.isActivo());
            pstmt.setDate(8, Date.valueOf(usuario.getFechaIngreso()));
            pstmt.setString(9, usuario.getPreguntaRecuperacion());
            pstmt.setString(10, usuario.getRespuestaRecuperacion());
            pstmt.setString(11, usuario.getFirma());
            
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public Usuario buscarUsuarioPorId(int numEmpleado) {
        String sql = "SELECT * FROM usuarios WHERE Num_Empleado = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, numEmpleado);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                Usuario usuario = new Usuario();
                usuario.setNumEmpleado(rs.getInt("Num_Empleado"));
                usuario.setNombre(rs.getString("Nombre"));
                usuario.setApellidoPaterno(rs.getString("Apellido_paterno"));
                usuario.setApellidoMaterno(rs.getString("Apellido_materno"));
                usuario.setCorreo(rs.getString("Correo"));
                usuario.setIdRol(rs.getInt("Id_Rol"));
                usuario.setActivo(rs.getBoolean("Activo"));
                usuario.setFechaIngreso(rs.getDate("Fecha_Ingreso").toLocalDate());
                return usuario;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    public Usuario buscarUsuarioPorCorreo(String correo) {
        String sql = "SELECT * FROM usuarios WHERE Correo = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, correo);
            ResultSet rs = pstmt.executeQuery();
            if (rs.next()) {
                Usuario usuario = new Usuario();
                usuario.setNumEmpleado(rs.getInt("Num_Empleado"));
                usuario.setNombre(rs.getString("Nombre"));
                usuario.setApellidoPaterno(rs.getString("Apellido_paterno"));
                usuario.setApellidoMaterno(rs.getString("Apellido_materno"));
                usuario.setCorreo(rs.getString("Correo"));
                usuario.setIdRol(rs.getInt("Id_Rol"));
                usuario.setActivo(rs.getBoolean("Activo"));
                usuario.setFechaIngreso(rs.getDate("Fecha_Ingreso").toLocalDate());
                usuario.setFirma(rs.getString("Firma"));
                return usuario;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean actualizarUsuario(Usuario usuario) {
        String sql = "UPDATE usuarios SET Nombre = ?, Apellido_paterno = ?, Apellido_materno = ?, Correo = ?, Id_Rol = ?, Firma = ? WHERE Num_Empleado = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, usuario.getNombre());
            pstmt.setString(2, usuario.getApellidoPaterno());
            pstmt.setString(3, usuario.getApellidoMaterno());
            pstmt.setString(4, usuario.getCorreo());
            pstmt.setInt(5, usuario.getIdRol());
            pstmt.setString(6, usuario.getFirma());
            pstmt.setInt(7, usuario.getNumEmpleado());
            
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean eliminarUsuario(int numEmpleado) {
        String sql = "DELETE FROM usuarios WHERE Num_Empleado = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, numEmpleado);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}