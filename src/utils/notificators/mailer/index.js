const { config } = require('../../../config/index');
const { createTransport } = require('nodemailer');
const { errorLog: loggerWinston } = require("../../loggers/winston");

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
            loggerWinston.error(`NodeMailer -> Ejecutando: '${ejecutando}' || Error: ${error.message}`);
        }
    }

    send_NewUser(newUser) {
        const mailOptions = {
            from: 'Node.js Server',
            to: config.ADMIN_EMAIL,
            subject: 'Store - New User',
            html: `
                <h1 style="color: coral;">New User</h1>
                
                <table style="width:100%">
                    <tr>
                        <th style="text-align:right; vertical-align: top;">Email:</th>
                        <td>${newUser.email}</td>
                    </tr>
                    <tr>
                        <th style="text-align:right; vertical-align: top;">Password:</th>
                        <td>${newUser.password}</td>
                    </tr>
                    <tr>
                        <th style="text-align:right; vertical-align: top;">Name:</th>
                        <td>${newUser.name}</td>
                    </tr>
                    <tr>
                        <th style="text-align:right; vertical-align: top;">Avatar:</th>
                        <td>${newUser.img}</td>
                    </tr>
                    <tr>
                        <th style="text-align:right; vertical-align: top;">Role:</th>
                        <td>${newUser.role}</td>
                    </tr>
                </table>
            `
        }
        
        NodeMailer.send(mailOptions, "send_NewUser()");
    }
    
    send_NewOrder(user, detail) {
        const detailText = NodeMailer.createDetailText(detail);
    
        const mailOptions = {
            from: 'Node.js Server',
            to: config.ADMIN_EMAIL,
            subject: `New Order ${user.name} - ${user.email}`,
            html: `
                <h1 style="color: lightskyblue;">New Order !</h1>
    
                <h3>DETAILS: </h3>
                <hr />
                
                <table style="width:100%">
                    <tr>
                        <th style="width:20%">Units</th>
                        <th style="width:80%">Product</th>
                    </tr>
                    ${detailText}
                </table>
            `
        }
        
        NodeMailer.send(mailOptions, "send_NewOrder()");
    }

    static createDetailText(detail) {
        let detailText = "";
    
        for (const nombreDeProducto in detail) {
            detailText += `<tr>
                <td style="vertical-align: top;">${detail[nombreDeProducto]}u</td>
                <td style="vertical-align: top;">${nombreDeProducto}</td>
            </tr>`
        }

        return detailText;
    }
}

module.exports = new NodeMailer();