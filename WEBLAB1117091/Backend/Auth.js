import { getConnection } from './database.js';

export const Auth = {
    login: async (usuario, contraseña) => {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('usuario', usuario)
                .input('contraseña', contraseña)
                .execute('sp_Login');

            if (result.recordset.length === 0) {
                return { 
                    success: false, 
                    message: 'Usuario o contraseña incorrectos' 
                };
            }

            return { 
                success: true, 
                data: result.recordset[0] 
            };
        } catch (error) {
            console.error('Error en login:', error);
            return { 
                success: false, 
                message: 'Error en el servidor' 
            };
        }
    },

    registro: async (userData) => {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('nombre', userData.nombre)
                .input('apellido', userData.apellido)
                .input('email', userData.email)
                .input('usuario', userData.usuario)
                .input('contraseña', userData.contraseña)
                .execute('sp_Registro');

            if (result.returnValue === 0) {
                return { 
                    success: true, 
                    message: 'Usuario registrado exitosamente',
                    userId: result.recordset[0].id 
                };
            } else {
                return { 
                    success: false, 
                    message: 'Error al registrar usuario' 
                };
            }
        } catch (error) {
            console.error('Error en registro:', error);
            return { 
                success: false, 
                message: error.message 
            };
        }
    }
};