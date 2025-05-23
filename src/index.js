import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import formRoutes from './routes/formRoutes.js'

dotenv.config();

//Crea la aplicacion de express
const app = express()

//Habilita middleware para aceptar json
app.use(express.json())

//Habilita middleware para aceptar cors
const allowedOrigins = [
    'https://localhost:5173',
    'https://www.psicologiakusikuy.com'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, // solo tu frontend
  methods: ['GET', 'POST'],       // o lo que uses
  credentials: true               // solo si usás cookies o sesiones
}))

//Rutas
app.use('/api', formRoutes)

//Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funciona correctamente 🎉')
})

//Puerto
const PORT = process.env.PORT || 3000;

//Llamado a puerto
app.listen( PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
} )