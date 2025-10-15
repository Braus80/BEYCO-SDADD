'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoginPage.module.css';
import Link from 'next/link';

export default function LoginPage() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:8080/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, contrasena }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('userData', JSON.stringify(data));
                const userRole = data.role.toLowerCase();
                switch (userRole) {
                    case 'administrador':
                        router.push('/admin');
                        break;
                    case 'instructor':
                        router.push('/instructor');
                        break;
                    case 'secretaria':
                        router.push('/secretaria');
                        break;
                    default:
                        setError('Rol no reconocido.');
                }
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (err) {
            setError('Error de conexión. No se pudo conectar al servidor.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <img src="/logo.jpg" alt="BEYCO Consultores Logo" className={styles.logo} />
                <h1>¡Bienvenido!</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="usuario">Usuario</label>
                        <input id="usuario" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="contrasena">Contraseña</label>
                        <input id="contrasena" type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                    </div>
                    <button type="submit" className={styles.loginButton}>Iniciar sesión</button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
                <Link href="/recuperar-contrasena" className={styles.forgotPassword}>
                    Recordar contraseña
                </Link>
            </div>
        </div>
    );
}

