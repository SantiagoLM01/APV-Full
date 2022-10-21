import nodemailer, { createTransport } from 'nodemailer'

const emailRegistro = async (datos) => {


    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASS
        }
    })



    const { email, nombre, token } = datos
    const info = await transport.sendMail({
        from: 'APV - Administrador de Paciente de Veterinaria',
        to: email,
        subject: 'Comprueba tu cuenta en APV',
        text: 'Conprueba tu cuenta en APV',
        html: `<p> Hola ${nombre}, comprueba tu cuenta en APV.</p>
        <p> Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:<a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar Cuenta</a></p>
        
        <p> Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>`
    })

    console.log('Mensaje enviado: %s', info.messageId)
    //Enviar el email

}

export default emailRegistro