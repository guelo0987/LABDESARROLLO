import { useState } from 'react';
import { giftService } from '../services/api';

interface Props {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
  userId?: number;
  isGuardado?: boolean;
  onEliminar?: () => void;
}

export const GifCard = ({ id, title, images, userId, isGuardado, onEliminar }: Props) => {
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleGuardar = async () => {
    if (!userId) return;
    
    try {
      setProcesando(true);
      await giftService.guardarGif({
        usuario_id: userId,
        gif_id: id,
        titulo: title,
        url: images.fixed_height.url
      });
      setMensaje('¡GIF guardado exitosamente!');
      setTimeout(() => setMensaje(''), 3000);
    } catch (error: any) {
      setError('Error al guardar el GIF');
    } finally {
      setProcesando(false);
    }
  };

  const handleEliminar = async () => {
    if (!userId || !onEliminar) return;
    
    try {
      setProcesando(true);
      await giftService.eliminarGif(userId, id);
      onEliminar();
    } catch (error: any) {
      setError('Error al eliminar el GIF');
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img 
        src={images.fixed_height.url} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-600 truncate">{title}</p>
        {userId && (
          <button
            onClick={isGuardado ? handleEliminar : handleGuardar}
            disabled={procesando}
            className={`mt-2 w-full px-4 py-2 rounded ${
              isGuardado 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white disabled:opacity-50`}
          >
            {procesando ? 'Procesando...' : isGuardado ? 'Eliminar' : 'Guardar GIF'}
          </button>
        )}
        {mensaje && <p className="text-green-500 text-xs mt-1 text-center">{mensaje}</p>}
        {error && <p className="text-red-500 text-xs mt-1 text-center">{error}</p>}
      </div>
    </div>
  );
};