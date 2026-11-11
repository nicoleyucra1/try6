import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';
import HistoryPage from './pages/HistoryPage';
import AnimesPage from './pages/AnimesPage';
import Layout from './Layout';

export default function App(){
  return(
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route element={<Layout/>}>
        <Route path="/animes" element={<AnimesPage/>}/>
        <Route path="/favorites" element={<FavoritesPage/>}/>
        <Route path="/history" element={<HistoryPage/>}/>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace/>}/>
    </Routes>
  )
}