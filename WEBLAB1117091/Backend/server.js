import express from 'express';
import cors from 'cors';
import { Auth } from './Auth.js';
import { SaveGift } from './SaveGift.js';
import config from './config.js';

const app = express();

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Rutas de autenticación
app.post('/api/login', async (req, res) => {
  try {
    const result = await Auth.login(req.body.usuario, req.body.contraseña);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

app.post('/api/registro', async (req, res) => {
  try {
    const result = await Auth.registro(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Rutas para GIFs guardados
app.post('/api/gifts/guardar', async (req, res) => {
  try {
    const result = await SaveGift.guardarGif(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al guardar el GIF' });
  }
});

app.get('/api/gifts/:userId', async (req, res) => {
  try {
    const result = await SaveGift.obtenerGifsGuardados(req.params.userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los GIFs guardados' });
  }
});

app.delete('/api/gifts/:userId/:gifId', async (req, res) => {
    try {
        const result = await SaveGift.eliminarGif(req.params.userId, req.params.gifId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el GIF' });
    }
});

app.listen(config.PORT, config.HOST, () => {
  console.log(`Servidor ejecutándose en http://${config.HOST}:${config.PORT}`);
});