import { useState } from 'react';
import { SearchForm } from './Components/SearchForm';
import { GifCard } from './Components/GifCard';
import { GifCategory } from './Components/GIftCategory';
import { Login } from './Components/Login';
import { Registro } from './Components/Registro';
import { GifsGuardados } from './Components/GifsGuardados';
import { Gif } from './types';
import './App.css';

function App() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [cargando, setCargando] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showSavedGifs, setShowSavedGifs] = useState(false);
  const categoriasFijas = ['Gatos', 'Perros', 'Memes'];
  const [userData, setUserData] = useState<{ id: number } | null>(null);

  const buscarGifs = async (termino: string) => {
    try {
      setCargando(true);
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${termino}&limit=10`;
      const respuesta = await fetch(url);
      const { data } = await respuesta.json();
      setGifs(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              className={`px-4 py-2 rounded ${showLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setShowLogin(true)}
            >
              Iniciar Sesión
            </button>
            <button
              className={`px-4 py-2 rounded ${!showLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setShowLogin(false)}
            >
              Registrarse
            </button>
          </div>
          
          {showLogin ? (
            <Login onLoginSuccess={(data) => {
              setIsAuthenticated(true);
              setUserData(data);
            }} />
          ) : (
            <Registro onRegistroSuccess={() => setShowLogin(true)} />
          )}
        </div>
      </div>
    );
  }

  if (showSavedGifs) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowSavedGifs(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            ← Volver
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => setIsAuthenticated(false)}
          >
            Cerrar Sesión
          </button>
        </div>
        <GifsGuardados userId={userData?.id} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Buscador de GIFs</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowSavedGifs(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            🔖 Mis GIFs Guardados
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => setIsAuthenticated(false)}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <SearchForm onBuscar={buscarGifs} />
      
      {cargando && <p className="text-center py-4">Cargando...</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gifs.map(gif => (
          <GifCard key={gif.id} {...gif} userId={userData?.id} />
        ))}
      </div>

      <div className="categorias mt-8">
        <h2 className="text-2xl font-bold mb-4">Categorías Populares</h2>
        {categoriasFijas.map(categoria => (
          <GifCategory key={categoria} categoria={categoria} userId={userData?.id} />
        ))}
      </div>
    </div>
  );
}

export default App;