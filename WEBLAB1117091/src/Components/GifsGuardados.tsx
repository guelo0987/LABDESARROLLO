import { useState, useEffect } from 'react';
import { giftService } from '../services/api';
import { GifCard } from './GifCard';

interface Props {
  userId?: number;
}

interface SavedGif {
  id: number;
  gif_id: string;
  titulo: string;
  url: string;
  fecha_guardado: string;
}

export const GifsGuardados = ({ userId }: Props) => {
  if (!userId) return null;

  const [gifs, setGifs] = useState<SavedGif[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarGifsGuardados = async () => {
      try {
        const response = await giftService.obtenerGifsGuardados(userId);
        if (response.success) {
          setGifs(response.data);
        }
      } catch (error) {
        setError('Error al cargar los GIFs guardados');
      } finally {
        setCargando(false);
      }
    };

    cargarGifsGuardados();
  }, [userId]);

  if (cargando) return <p className="text-center py-4">Cargando GIFs guardados...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Mis GIFs Guardados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gifs.map(gif => (
          <GifCard 
            key={gif.gif_id}
            id={gif.gif_id}
            title={gif.titulo}
            images={{
              fixed_height: {
                url: gif.url
              }
            }}
            userId={userId}
            isGuardado={true}
            onEliminar={() => {
              setGifs(gifs.filter(g => g.gif_id !== gif.gif_id));
            }}
          />
        ))}
      </div>
    </div>
  );
}; 