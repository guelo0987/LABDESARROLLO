import { useState } from 'react';
import { Gif } from '../types';
import { GifCard } from './GifCard';

interface Props {
  categoria: string;
  userId?: number;
}

export const GifCategory = ({ categoria, userId }: Props) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [cargando, setCargando] = useState(false);

  const cargarGifs = async () => {
    try {
      setCargando(true);
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${categoria}&limit=10`;
      const respuesta = await fetch(url);
      const { data } = await respuesta.json();
      setGifs(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="gif-category">
      <h2>{categoria}</h2>
      <button onClick={cargarGifs}>Cargar GIFs</button>
      
      {cargando && <p>Cargando...</p>}
      
      <div className="gif-grid">
        {gifs.map(gif => (
          <GifCard key={gif.id} {...gif} userId={userId} />
        ))}
      </div>
    </div>
  );
};