import axios from 'axios';

export const api = axios.create({baseURL: 'http://localhost:8080'});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403){
            localStorage.removeItem('token');
            if (window.location.pathname !== '/login') window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export function getErrorMessage(error: unknown): string{
    if (!axios.isAxiosError(error)) return 'Error inesperado';
    if (!error.response) return 'No se pudo conectar con el servidor';
    const data = error.response.data as { message?: string; error?: string};
    return data?.message ?? data?.error ?? `Error ${error.response.status}`;
}