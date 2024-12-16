import { getConnection } from './database.js';

export const SaveGift = {
    guardarGif: async (gifData) => {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('usuario_id', gifData.usuario_id)
                .input('gif_id', gifData.gif_id)
                .input('titulo', gifData.titulo)
                .input('url', gifData.url)
                .execute('sp_GuardarGif');

            if (result.returnValue === 0) {
                return {
                    success: true,
                    message: result.recordset[0].message,
                    id: result.recordset[0].id
                };
            } else {
                return {
                    success: false,
                    message: result.recordset[0].message
                };
            }
        } catch (error) {
            console.error('Error al guardar GIF:', error);
            return {
                success: false,
                message: error.message
            };
        }
    },

    obtenerGifsGuardados: async (usuarioId) => {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('usuario_id', usuarioId)
                .execute('sp_ObtenerGifsGuardados');

            return {
                success: true,
                data: result.recordset
            };
        } catch (error) {
            console.error('Error al obtener GIFs guardados:', error);
            return {
                success: false,
                message: error.message
            };
        }
    },


    eliminarGif: async (usuarioId, gifId) => {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('usuario_id', usuarioId)
                .input('gif_id', gifId)
                .execute('sp_EliminarGifGuardado');
    
            return {
                success: true,
                message: result.recordset[0].message
            };
        } catch (error) {
            console.error('Error al eliminar GIF:', error);
            return {
                success: false,
                message: error.message
            };
        }
    }
};