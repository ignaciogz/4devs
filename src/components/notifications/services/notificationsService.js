const { config } = require('../../../config');
const { NodeMailer } = require('../../../utils/notificators/mailer');

class Notifications {
    notify_NewOrder(order) {
        let detailText = "";
    
        for (const item of order.items) {
            detailText += `<tr>
                <td style="vertical-align: top;">${item.qty}u</td>
                <td style="vertical-align: top;">${item.name}</td>
            </tr>`
        }

        const content = `
            <h1 style="color: lightskyblue;">New Order !</h1>

            <h3>DETAILS: </h3>
            <hr />
            
            <table style="width:100%">
                <tr>
                    <th style="width:20%">Units</th>
                    <th style="width:80%">Product</th>
                </tr>
                ${detailText}
            </table>`;

        const mailOptionsAdmin = {
            from: 'Node.js Server',
            to: config.ADMIN_EMAIL,
            subject: `New Order ${order.client.name} - ${order.client.email}`,
            html: content
        }

        const mailOptionsUser = {
            from: 'Node.js Server',
            to: order.client.email,
            subject: `New Order ${order.client.name} - ${order.client.email}`,
            html: content
        }
        
        NodeMailer.send(mailOptionsAdmin, "send_NewOrder() - Admin");
        NodeMailer.send(mailOptionsUser, "send_NewOrder() - User");
    }
    
    notify_NewRegister(newUser) {
        const content = `
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
            </table>`;

        const mailOptionsAdmin = {
            from: 'Node.js Server',
            to: config.ADMIN_EMAIL,
            subject: '4DEVS Shop - New User',
            html: `
                <h1 style="color: coral;">New User</h1>
                ${content}
            `
        }

        const mailOptionsNewUser = {
            from: 'Node.js Server',
            to: newUser.email,
            subject: '4DEVS Shop - Welcome',
            html: `
                <h1 style="color: coral;">Welcome ! ${newUser.name}</h1>
                ${content}
            `
        }
        
        NodeMailer.send(mailOptionsAdmin, "notify_NewRegister() - Admin");
        NodeMailer.send(mailOptionsNewUser, "notify_NewRegister() - NewUser");
    }
}

module.exports = new Notifications();