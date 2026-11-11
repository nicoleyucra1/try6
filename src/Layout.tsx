import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';

const APP_NAME = "SparkyRoll";
const LINKS = [
    {to: '/animes', label: 'Animes'},
    {to: '/favorites', label: 'Favoritos'},
    {to: '/history', label:'Historial'}
]

export default function Layout(){
    const navigate = useNavigate();
    if (!localStorage.getItem('token')) return <Navigate to="/login"/>;

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-indigo-600 text-white px-6 py-3 flex items-center justify-between">
                <Link to={LINKS[0].to} className="text-cl font-bold">{APP_NAME}</Link>
                <div className="flex items-center gap-4">
                    {LINKS.map((l)=>(<Link key={l.to} to={l.to} className="hover:underline">{l.label}</Link>))}
                    <button onClick={logout} className="bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1">
                    Salir</button>
                </div>
            </nav>
            <main className='max-w-6xl mx-auto p-6'>
                <Outlet/>
            </main>
        </div>
    )
}