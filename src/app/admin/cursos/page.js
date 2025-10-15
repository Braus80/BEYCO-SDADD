'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Cursos.module.css';

// --- Componente para la Fila de Edición ---
const EditRow = ({ curso, onChange, instructores, empresas, catalogoCursos }) => {
    return (
        <tr className={styles.editingRow}>
            <td>
                <select name="nombre" value={curso.nombre || ''} onChange={onChange} required>
                    <option value="">Seleccionar curso</option>
                    {catalogoCursos.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                </select>
            </td>
            <td><input type="text" name="stps" value={curso.stps || ''} onChange={onChange} placeholder="Clave STPS" /></td>
            <td><input type="number" name="horas" value={curso.horas || ''} onChange={onChange} placeholder="Horas" min="1" /></td>
            <td><input type="date" name="fechaIngreso" value={curso.fechaIngreso || ''} onChange={onChange} required /></td>
            <td>
                <select name="instructorId" value={curso.instructorId || ''} onChange={onChange} required>
                    <option value="">Seleccionar instructor</option>
                    {instructores.map(i => (
                        <option key={i.numEmpleado} value={i.numEmpleado}>
                            {i.nombre} {i.apellidoPaterno} {i.apellidoMaterno}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <select name="empresaId" value={curso.empresaId || ''} onChange={onChange} required>
                    <option value="">Seleccionar empresa</option>
                    {empresas.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                </select>
            </td>
            <td><input type="text" name="lugar" value={curso.lugar || ''} onChange={onChange} placeholder="Lugar" required /></td>
        </tr>
    );
};

export default function CursosPage() {
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    // Estados para los datos de los desplegables
    const [instructores, setInstructores] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [catalogoCursos, setCatalogoCursos] = useState([]);

    // Estados para la edición y selección
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCurso, setSelectedCurso] = useState(null);
    const [cursoData, setCursoData] = useState({});

    // Estados para la búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('nombre');

    // Limpiar mensajes después de 5 segundos
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccess(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Cargar cursos
                const cursosRes = await fetch('http://localhost:8080/api/cursos');
                if (!cursosRes.ok) {
                    throw new Error(`Error ${cursosRes.status} cargando cursos`);
                }
                const cursosData = await cursosRes.json();
                setCursos(cursosData);
                
                // Intentar cargar instructores
                try {
                    const instructoresRes = await fetch('http://localhost:8080/api/usuarios/instructores');
                    if (instructoresRes.ok) {
                        const instructoresData = await instructoresRes.json();
                        setInstructores(instructoresData);
                    } else {
                        throw new Error('Endpoint de instructores no disponible');
                    }
                } catch (instructoresError) {
                    console.warn("Usando datos de prueba para instructores:", instructoresError);
                    setInstructores([
                        {numEmpleado: 1, nombre: 'Juan', apellidoPaterno: 'Pérez', apellidoMaterno: 'García'},
                        {numEmpleado: 2, nombre: 'María', apellidoPaterno: 'López', apellidoMaterno: 'Hernández'},
                        {numEmpleado: 3, nombre: 'Carlos', apellidoPaterno: 'Rodríguez', apellidoMaterno: 'Martínez'}
                    ]);
                }
                
                // Datos de ejemplo para empresas y catálogo
                setEmpresas([
                    {id: 1, nombre: 'Formex'}, 
                    {id: 2, nombre: 'Nemak'}
                ]);
                setCatalogoCursos([
                    {id: 1, nombre: 'Seguridad Industrial'}, 
                    {id: 2, nombre: 'Búsqueda y Rescate'},
                    {id: 3, nombre: 'Primeros Auxilios'},
                    {id: 4, nombre: 'Prevención de Riesgos'}
                ]);

            } catch (error) {
                console.error("Error cargando datos iniciales:", error);
                setError("Error al cargar los cursos: " + error.message);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const handleSelectCurso = (curso) => {
        if (isAdding || isEditing) return;
        setSelectedCurso(curso);
        setCursoData({
            ...curso,
            nombre: curso.nombre || '',
            stps: curso.stps || '',
            horas: curso.horas || 8,
            fechaIngreso: curso.fechaIngreso || '',
            instructorId: instructores.find(i => 
                `${i.nombre} ${i.apellidoPaterno} ${i.apellidoMaterno}` === curso.instructor
            )?.numEmpleado || '',
            empresaId: empresas.find(e => e.nombre === curso.empresa)?.id || '',
            lugar: curso.lugar || ''
        });
    };

    const handleAgregarClick = () => {
        setIsAdding(true);
        setIsEditing(false);
        setSelectedCurso(null);
        setCursoData({ 
            fechaIngreso: new Date().toISOString().split('T')[0],
            horas: 8
        });
        setError(null);
        setSuccess(null);
    };

    const handleModificarClick = () => {
        if (!selectedCurso) {
            setError("Selecciona un curso para modificar.");
            return;
        }
        setIsEditing(true);
        setIsAdding(false);
        setError(null);
        setSuccess(null);
    };
    
    const handleCancelarClick = () => {
        setIsAdding(false);
        setIsEditing(false);
        setSelectedCurso(null);
        setCursoData({});
        setError(null);
        setSuccess(null);
    };

    const handleGuardarClick = async () => {
        // Validaciones básicas
        if (!cursoData.nombre || !cursoData.fechaIngreso || !cursoData.instructorId || !cursoData.empresaId || !cursoData.lugar) {
            setError("Por favor completa todos los campos obligatorios: Curso, Fecha, Instructor, Empresa y Lugar");
            return;
        }

        const method = isAdding ? 'POST' : 'PUT';
        const url = isAdding ? 'http://localhost:8080/api/cursos' : `http://localhost:8080/api/cursos/${selectedCurso.id}`;
        
        try {
            setError(null);
            console.log('Enviando datos:', cursoData);
            
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cursoData),
            });
            
            let errorMessage = `Error ${response.status}: `;
            
            // Intentar obtener el mensaje de error
            try {
                const errorText = await response.text();
                if (errorText) {
                    errorMessage += errorText;
                } else {
                    errorMessage += 'Respuesta vacía del servidor';
                }
            } catch {
                errorMessage += 'No se pudo leer la respuesta del servidor';
            }
            
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            
            // Recargar la lista de cursos
            const cursosRes = await fetch('http://localhost:8080/api/cursos');
            if (cursosRes.ok) {
                const data = await cursosRes.json();
                setCursos(data);
            }
            
            setSuccess(`Curso ${isAdding ? 'creado' : 'actualizado'} correctamente`);
            handleCancelarClick();

        } catch (error) {
            console.error('Error completo:', error);
            setError(error.message);
        }
    };

    const handleEliminarClick = async () => {
        if (!selectedCurso) {
            setError("Selecciona un curso para eliminar.");
            return;
        }
        
        if (window.confirm(`¿Seguro que quieres eliminar el curso "${selectedCurso.nombre}"?`)) {
            try {
                setError(null);
                const url = `http://localhost:8080/api/cursos/${selectedCurso.id}`;
                console.log('Eliminando curso en URL:', url);
                
                const response = await fetch(url, { 
                    method: 'DELETE' 
                });
                
                let errorMessage = `Error ${response.status}: `;
                
                // Manejar respuesta 204 No Content (éxito en DELETE)
                if (response.status === 204) {
                    setCursos(cursos.filter(c => c.id !== selectedCurso.id));
                    setSelectedCurso(null);
                    setSuccess("Curso eliminado correctamente");
                    return;
                }
                
                // Si no es 204, intentar obtener mensaje de error
                try {
                    const errorText = await response.text();
                    if (errorText) {
                        errorMessage += errorText;
                    } else {
                        errorMessage += 'Respuesta vacía del servidor';
                    }
                } catch {
                    errorMessage += 'No se pudo leer la respuesta del servidor';
                }
                
                if (!response.ok) {
                    throw new Error(errorMessage);
                }

            } catch (error) {
                console.error("Error al eliminar:", error);
                setError(error.message);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCursoData(prev => ({ ...prev, [name]: value }));
    };

    const filteredCursos = useMemo(() => 
        cursos.filter(curso => {
            if (!searchTerm) return true;
            const fieldValue = curso[filterBy]?.toString().toLowerCase();
            return fieldValue?.includes(searchTerm.toLowerCase());
        }), [cursos, searchTerm, filterBy]
    );

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <div className={styles.titleSection}><h1>Asignación de Cursos</h1></div>
                <img src="/logo.jpg" alt="BEYCO Consultores Logo" className={styles.logo} />
            </header>
            <main className={styles.mainContent}>
                {/* Mensajes de error y éxito */}
                {error && <div className={styles.error}>{error}</div>}
                {success && <div className={styles.success}>{success}</div>}
                
                <div className={styles.toolbar}>
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className={styles.filterOptions}>
                        <label>
                            <input 
                                type="radio" 
                                name="filter" 
                                value="nombre" 
                                checked={filterBy === 'nombre'} 
                                onChange={(e) => setFilterBy(e.target.value)} 
                            /> 
                            Nombre de curso
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="filter" 
                                value="instructor" 
                                checked={filterBy === 'instructor'} 
                                onChange={(e) => setFilterBy(e.target.value)} 
                            /> 
                            Instructor
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="filter" 
                                value="empresa" 
                                checked={filterBy === 'empresa'} 
                                onChange={(e) => setFilterBy(e.target.value)} 
                            /> 
                            Empresa
                        </label>
                    </div>
                </div>
                
                <div className={styles.tableContainer}>
                    {loading ? (
                        <p className={styles.loading}>Cargando cursos...</p>
                    ) : (
                        <table className={styles.cursosTable}>
                            <thead>
                                <tr>
                                    <th>Curso</th>
                                    <th>STPS</th>
                                    <th>Horas</th>
                                    <th>Fecha</th>
                                    <th>Instructor</th>
                                    <th>Empresa</th>
                                    <th>Lugar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(isAdding || isEditing) && (
                                    <EditRow 
                                        curso={cursoData} 
                                        onChange={handleInputChange} 
                                        instructores={instructores} 
                                        empresas={empresas} 
                                        catalogoCursos={catalogoCursos} 
                                    />
                                )}
                                {filteredCursos.map(curso => (
                                    !isEditing || selectedCurso?.id !== curso.id ? (
                                        <tr 
                                            key={curso.id}
                                            onClick={() => handleSelectCurso(curso)}
                                            className={selectedCurso?.id === curso.id ? styles.selectedRow : ''}
                                        >
                                            <td>{curso.nombre}</td>
                                            <td>{curso.stps}</td>
                                            <td>{curso.horas}</td>
                                            <td>{curso.fechaIngreso}</td>
                                            <td>{curso.instructor}</td>
                                            <td>{curso.empresa}</td>
                                            <td>{curso.lugar}</td>
                                        </tr>
                                    ) : null
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <footer className={styles.footer}>
                    <div className={styles.actionButtons}>
                        <button onClick={handleAgregarClick} className={styles.btn} disabled={isAdding || isEditing}>Agregar</button>
                        <button onClick={handleModificarClick} className={styles.btn} disabled={!selectedCurso || isAdding || isEditing}>Modificar</button>
                        <button onClick={handleEliminarClick} className={styles.btn} disabled={!selectedCurso || isAdding || isEditing}>Eliminar</button>
                        <button onClick={handleGuardarClick} className={styles.btnGuardar} disabled={!isAdding && !isEditing}>Guardar</button>
                        {(isAdding || isEditing) && (
                            <button onClick={handleCancelarClick} className={styles.btnCancelar}>Cancelar</button>
                        )}
                    </div>
                    <div className={styles.linkButtons}>
                        <button className={styles.btnLink}>Historial de cursos</button>
                        <button className={styles.btnLink}>Catálogo de cursos</button>
                    </div>
                    <button onClick={() => router.back()} className={styles.btnAtras}>Atrás</button>
                </footer>
            </main>
        </div>
    );
}