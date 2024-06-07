/* Require */
const nodemailer = require('nodemailer');

/* Send Email Main Function */
const sendMail = (email, password, token) => {
    try {
        //creo el password
        let message = {
            from: process.env.SARAQEL_AUTH_USER,
            to: email,
            subject: "Activate your account",
            text: "Account User is : " + email + " and Password is : " + password + " and your activation code is : "
                + token,
            html: ""
        };
        let transporter = nodemailer.createTransport({
            host: process.env.SARAQEL_AUTH_HOST, // hostname
            port: process.env.SARAQEL_AUTH_PORT, // port for secure SMTP
            secureConnection: false,
            tls: {
                ciphers: 'SSLv3'
            },
            auth: {
                user: process.env.SARAQEL_AUTH_USER,
                pass: process.env.SARAQEL_AUTH_PASSWORD
            }
        });
        transporter.sendMail(message, (error, info) => {
            if (!error) {
                console.log("Email enviado");
                console.log(info);
                return true;
            } else {
                console.log("Email no enviado");
                console.log(error);
                return false;
            }
        });
    } catch (error) {
        console.log(error);
    }
}

/* Exports */
module.exports = {
    sendMail
};