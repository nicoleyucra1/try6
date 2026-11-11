import { api } from './api';
import type { LoginRequest, RegisterRequest, AuthResponse, Anime, AnimeStatus, AnimeId, HistoryRequest } from './types';


export async function loginRequest(data: LoginRequest): Promise<AuthResponse>{
    const res = await api.post<AuthResponse>('/api/auth/login', data);
    return res.data;
}

export async function registerRequest(data: RegisterRequest): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>('/api/auth/register', data);
    return res.data;
}

export async function getAnimes():Promise<Anime[]>{
    const res = await api.get<Anime[]>('/api/albums');
    return res.data;
}

export async function addHistory(data: HistoryRequest): Promise<void>{
    await api.post('/api/user/history', data);
}

export async function addFavorite(data: AnimeId): Promise<void>{
    await api.post('/api/user/favorites', data);
}

export async function deleteFavorite(data: AnimeId): Promise<void>{
    await api.delete('/api/user/favorites', { data })
}