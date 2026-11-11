import { useState } from "react";
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerRequest } from '../services';
import { getErrorMessage } from "../api";
import { ui } from '../ui';

export default function LoginPage(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await registerRequest({name, email, password});
            navigate('/login')
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className={`${ui.card} w-80`}>
                <h1 className={ui.title}>Crear cuenta</h1>
                {error && <p className="text-red-600">{error}</p>}
                <input placeholder = "Nombre" required value={name} onChange={(e) => setName(e.target.value)} className={ui.input}/>
                <input type="email" placeholder ="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className={ui.input}/>
                <input type="password" placeholder ="Contrasena" required value={password} onChange={(e) => setPassword(e.target.value)} className={ui.input}/>
                <button className={ui.btn}>Registrarme</button>
                <p>Ya tienes cuenta?<Link to="/login" className="text-indigo-600">Iniciar sesion</Link></p>
            </form>
        </div>
    )
}