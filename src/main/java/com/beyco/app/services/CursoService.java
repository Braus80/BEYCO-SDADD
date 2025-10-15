package com.beyco.app.services;

import com.beyco.app.models.Curso;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class CursoService {

    private final Connection connection;

    @Autowired
    public CursoService(Connection connection) {
        this.connection = connection;
    }

    public List<Curso> listarTodosLosCursos() {
        List<Curso> cursosAsignados = new ArrayList<>();
        
        String sql = "SELECT " +
                     "c.Id_Curso, c.Nombre_curso, c.Clave_STPS, c.Fecha_Imparticion, c.Lugar, " +
                     "e.nombre AS nombre_empresa, " +
                     "u.Nombre AS nombre_instructor " +
                     "FROM cursos c " +
                     "JOIN empresas e ON c.Empresa_Id = e.id " +
                     "JOIN usuarios u ON c.Instructor_Id = u.Num_Empleado";

        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Curso curso = new Curso(
                    rs.getInt("Id_Curso"),
                    rs.getString("Nombre_curso"),
                    rs.getString("Clave_STPS"),
                    8, // Asignamos 8 horas como valor fijo
                    rs.getDate("Fecha_Imparticion").toLocalDate(),
                    rs.getString("nombre_empresa"),
                    rs.getString("nombre_instructor"),
                    rs.getString("Lugar")
                );
                cursosAsignados.add(curso);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error al listar cursos: " + e.getMessage());
        }
        return cursosAsignados;
    }

    public boolean crearCurso(Curso curso) {
        String sql = "INSERT INTO cursos (Nombre_curso, Fecha_Imparticion, Lugar, Empresa_Id, Instructor_Id, Clave_STPS) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            pstmt.setString(1, curso.getNombre());
            pstmt.setDate(2, Date.valueOf(curso.getFechaIngreso()));
            pstmt.setString(3, curso.getLugar());
            pstmt.setInt(4, curso.getEmpresaId());
            pstmt.setInt(5, curso.getInstructorId());
            pstmt.setString(6, curso.getStps());
            
            int affectedRows = pstmt.executeUpdate();
            
            if (affectedRows > 0) {
                // Obtener el ID generado
                try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        curso.setId(generatedKeys.getInt(1));
                    }
                }
                return true;
            }
            return false;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error al crear curso: " + e.getMessage());
        }
    }

    public boolean actualizarCurso(Curso curso) {
        String sql = "UPDATE cursos SET Nombre_curso = ?, Fecha_Imparticion = ?, Lugar = ?, Empresa_Id = ?, Instructor_Id = ?, Clave_STPS = ? WHERE Id_Curso = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, curso.getNombre());
            pstmt.setDate(2, Date.valueOf(curso.getFechaIngreso()));
            pstmt.setString(3, curso.getLugar());
            pstmt.setInt(4, curso.getEmpresaId());
            pstmt.setInt(5, curso.getInstructorId());
            pstmt.setString(6, curso.getStps());
            pstmt.setInt(7, curso.getId());
            
            int affectedRows = pstmt.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error al actualizar curso: " + e.getMessage());
        }
    }

    public boolean eliminarCurso(int idCurso) {
        String sql = "DELETE FROM cursos WHERE Id_Curso = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setInt(1, idCurso);
            int affectedRows = pstmt.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error al eliminar curso: " + e.getMessage());
        }
    }
}