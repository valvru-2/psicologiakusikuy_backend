import express from 'express'
import axios from 'axios'
import enviarCorreo from '../services/emailService.js';
const router = express.Router();

router.post( '/contacto', async (req, res) => {
    if(req.body) console.log('Body recibido en /contacto', req.body)
    const { nombre, email, descripcion } = req.body;
    let hubspotWarning = null;

    try {
        await axios.post('https://api.hubapi.com/crm/v3/objects/contacts', 
            {
                properties: {
                    "email": email,
                    "firstname": nombre,
                    "descripcion_de_form_de_contacto": descripcion
                }
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.HUBSPOT}`,
                    'Content-type': 'application/json'
                }
            }
        )

        
        console.log('Enviado a Hubspot')
        
        
        res.status(200).json({ message: 'Formulario enviado a Hubspot' })
    } catch (e) {
        const status = e.response?.status;
        const data = e.response?.data;

        if (status === 409 && data?.message?.includes('already exists')) {
            console.warn('⚠️ Contacto ya existente en HubSpot:', data.message);
            hubspotWarning = 'El contacto ya existía en HubSpot';
        } else {
            console.error('❌ Error real al conectar con HubSpot:', data || e.message);
            return res.status(500).json({
                message: 'Hubo un error al conectar con HubSpot',
                error: data || e.message
            });
        }
    }
    
    
    try {
        await enviarCorreo( nombre, email, descripcion )
        console.log('Correo interno enviado con exito')
        
    } catch (e) {
        console.error( 'Error al enviar el correo: ' ,e.message)
        return res.status(500).json({
            message: 'Error al enviar correo',
            error: e.message
        })
    }

    res.status(200).json({
        message: 'Formulario procesado correctamente',
        hubspot: hubspotWarning || 'Contacto creado correctamente'
    })
} )

export default router