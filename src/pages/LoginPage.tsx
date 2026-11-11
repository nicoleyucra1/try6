import { useState } from "react";
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../services';
import { getErrorMessage } from "../api";
import { ui } from '../ui';

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const data = await loginRequest({email, password});
            localStorage.setItem('token', data.token);
            navigate('/animes');
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className={`${ui.card} w-80`}>
                <h1 className={ui.title}>Iniciar sesion</h1>
                {error && <p className="text-red-600">{error}</p>}
                <input type="email" placeholder="Email" required value={email} onChange={(e)=> setEmail(e.target.value)} className={ui.input}/>
                <input type="password" placeholder="Contrasena" required value={password} onChange={(e)=> setPassword(e.target.value)} className={ui.input}/>
                <button className={ui.btn}>Ingresar</button>
                <p>No tienes cuenta?<Link to="/register" className="text-indigo-600">Registrate</Link></p>
            </form>
        </div>
    )
}