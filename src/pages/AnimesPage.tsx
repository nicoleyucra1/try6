import { useEffect, useState } from 'react';
import { getAnimes, addFavorite, addHistory } from '../services';
import { getErrorMessage } from '../api';
import type { Anime, HistoryRequest } from '../types';
import { addItem } from '../storage'
import { ui } from '../ui';

export default function AnimesPage() {
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [selected, setSelected] = useState<Anime | null>(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAnimes();
                setAnimes(data);
            } catch (err) {
                setError(getErrorMessage);
            }
        };
        load();
    }, []);

    const handleFavorite = async (anime: Anime) => {
        setError('');
        setSuccess('');
        try {
            await addFavorite({ animeId: anime.id});
            addItem('favorites', anime);
            setSuccess(`"${anime.title}" agregada a favoritos`);
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    const handleHistory = async (anime: HistoryRequest) => {
        setError('');
        setSuccess('');
        try {
            await addHistory({ animeId: anime.animeId, status: anime.status });
            addItem('history', anime);
            setSuccess(`"${anime.title}" agregada a favoritos`);
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };
    
    return (
        <div>
            <h1 className={ui.title}>Animes</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {success && <p className="text-green-600 mb-4">{success}</p>}
            {animes.length === 0 && <p>No hay animes</p>}

        </div>
    )

}