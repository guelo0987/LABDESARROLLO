import { useState } from 'react';
import { authService } from '../services/api';

interface RegistroData {
  nombre: string;
  apellido: string;
  email: string;
  usuario: string;
  contraseña: string;
}

interface Props {
  onRegistroSuccess: () => void;
}

export const Registro = ({ onRegistroSuccess }: Props) => {
  const [formData, setFormData] = useState<RegistroData>({
    nombre: '',
    apellido: '',
    email: '',
    usuario: '',
    contraseña: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.registro(formData);
      if (response.success) {
        onRegistroSuccess();
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registro
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {[
              { name: 'nombre', placeholder: 'Nombre', type: 'text' },
              { name: 'apellido', placeholder: 'Apellido', type: 'text' },
              { name: 'email', placeholder: 'Email', type: 'email' },
              { name: 'usuario', placeholder: 'Usuario', type: 'text' },
              { name: 'contraseña', placeholder: 'Contraseña', type: 'password' }
            ].map((field) => (
              <div key={field.name}>
                <input
                  type={field.type}
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof RegistroData]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                />
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
