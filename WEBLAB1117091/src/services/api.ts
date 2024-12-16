import axios from 'axios';

// Para el backend
const API_URL = `http://${import.meta.env.VITE_HOST || '127.0.0.1'}:${import.meta.env.VITE_PORT || '5000'}/api`;

export const authService = {
  login: async (credentials: { usuario: string; contraseña: string }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  registro: async (userData: {
    nombre: string;
    apellido: string;
    email: string;
    usuario: string;
    contraseña: string;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/registro`, userData);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};

export const giftService = {
    guardarGif: async (gifData: {
        usuario_id: number;
        gif_id: string;
        titulo: string;
        url: string;
    }) => {
        try {
            const response = await axios.post(`${API_URL}/gifts/guardar`, gifData);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    obtenerGifsGuardados: async (userId: number) => {
        try {
            const response = await axios.get(`${API_URL}/gifts/${userId}`);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    eliminarGif: async (userId: number, gifId: string) => {
        try {
            const response = await axios.delete(`${API_URL}/gifts/${userId}/${gifId}`);
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }
};