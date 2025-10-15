'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './PasswordRecovery.module.css';
import Link from 'next/link';

export default function PasswordRecoveryPage() {
    const [step, setStep] = useState(1); // 1: Pedir correo, 2: Pregunta, 3: Nueva contraseña
    const [email, setEmail] = useState('');
    const [pregunta, setPregunta] = useState('');
    const [respuesta, setRespuesta] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:8080/api/usuarios/pregunta-seguridad', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo: email }),
            });
            if (!res.ok) throw new Error(await res.text());
            const data = await res.json();
            setPregunta(data.pregunta);
            setStep(2);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRespuestaSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:8080/api/usuarios/verificar-respuesta', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo: email, respuesta: respuesta }),
            });
            if (!res.ok) throw new Error(await res.text());
            setStep(3);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdateSubmit = async (e) => {
        e.preventDefault();
        if (nuevaContrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch('http://localhost:8080/api/usuarios/actualizar-contrasena', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo: email, nuevaContrasena: nuevaContrasena }),
            });
            if (!res.ok) throw new Error(await res.text());
            alert('Contraseña actualizada con éxito. Serás redirigido al login.');
            router.push('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <form onSubmit={handleEmailSubmit}>
                        <h2>¿No recuerdas tu contraseña?</h2>
                        <p>Ingresa tu correo para recuperar tu cuenta.</p>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Correo electrónico</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <button type="submit" className={styles.submitButton} disabled={loading}>{loading ? 'Cargando...' : 'Solicitar'}</button>
                    </form>
                );
            case 2:
                return (
                    <form onSubmit={handleRespuestaSubmit}>
                        <h2>Pregunta de seguridad</h2>
                        <p className={styles.pregunta}>{pregunta}</p>
                        <div className={styles.inputGroup}>
                            <label htmlFor="respuesta">Respuesta</label>
                            <input type="text" id="respuesta" value={respuesta} onChange={(e) => setRespuesta(e.target.value)} required />
                        </div>
                        <button type="submit" className={styles.submitButton} disabled={loading}>{loading ? 'Verificar' : 'Solicitar'}</button>
                    </form>
                );
            case 3:
                return (
                    <form onSubmit={handlePasswordUpdateSubmit}>
                        <h2>Actualiza tu contraseña</h2>
                        <p>Crea una nueva contraseña.</p>
                        <div className={styles.inputGroup}>
                            <label htmlFor="nuevaContrasena">Nueva contraseña</label>
                            <input type="password" id="nuevaContrasena" value={nuevaContrasena} onChange={(e) => setNuevaContrasena(e.target.value)} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="confirmarContrasena">Confirmar contraseña</label>
                            <input type="password" id="confirmarContrasena" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} required />
                        </div>
                        <button type="submit" className={styles.submitButton} disabled={loading}>{loading ? 'Actualizando...' : 'Confirmar contraseña'}</button>
                    </form>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.sidePanel}>
                <img src="/logo.jpg" alt="BEYCO Logo" />
            </div>
            <div className={styles.formPanel}>
                {renderStep()}
                {error && <p className={styles.error}>{error}</p>}
                <Link href="/" className={styles.backLink}>Atrás</Link>
            </div>
        </div>
    );
}

