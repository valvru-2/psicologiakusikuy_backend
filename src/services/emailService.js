import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

const enviarCorreo = async( nombre, email, descripcion ) => {

    const transportes = nodemailer.createTransport({
        host: 'mail.privateemail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: `"Psicologia Kusikuy" <${process.env.EMAIL}>`,
        to: 'info@psicologiakusikuy.com',
        subject: 'Nuevo envío de formulario de contacto',
        html:`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8" />
                <title>Nuevo mensaje de contacto</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; margin: 0;">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <tr>
                    <td style="padding: 20px;">
                    <h2 style="color: #333333; margin-top: 0;">📩 Nuevo mensaje desde tu sitio web</h2>
                    <p style="font-size: 16px; color: #555555;">Has recibido un nuevo formulario de contacto. Revisa los detalles y responde lo antes posible:</p>

                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />

                    <p><strong>Nombre:</strong> ${nombre}</p>
                    <p><strong>Correo:</strong> ${email}</p>
                    <p><strong>Mensaje:</strong></p>
                    <p style="background-color: #f1f1f1; padding: 15px; border-radius: 4px; color: #333;">${descripcion}</p>

                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />

                    <p style="font-size: 14px; color: #999999;">Este mensaje fue generado automáticamente por el formulario de contacto del sitio web.</p>
                    </td>
                </tr>
                </table>
            </body>
            </html>

            `
    }

    await transportes.sendMail(mailOptions)
}

export default enviarCorreo