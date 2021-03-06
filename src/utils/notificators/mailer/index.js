const { config } = require('../../../config');
const { createTransport } = require('nodemailer');
const loggerWinston = require("../../logger");

class NodeMailer {
    static transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: config.ADMIN_EMAIL,
            pass: config.ADMIN_PASS_APP
        }
    });
    
    static send(mailOptions, ejecutando = "") {
        try {
            NodeMailer.transporter.sendMail(mailOptions);
        } catch (error) {
            loggerWinston.error(`NodeMailer -> '${ejecutando}' || Error: ${error.message}`);
        }
    }
}

module.exports = { NodeMailer }