const { args, config } = require('../../../config');
const { IntlTools } = require('../../../utils/tools');
const { NodeMailer } = require('../../../utils/notificators/mailer');

class Notifications {
    notify_NewOrder(order) {
        let detailText = "";
        let total = 0;
    
        for (const item of order.items) {
            let subtotal = item.qty * item.price;
            
            detailText += `<tr>
                <td style="vertical-align: middle;"><img width="60" height="60" src="${config.DEV 
                    ? "https://www.humanscale.com/userFiles/images/seating/smart/17_humanscale_diffrient_smart_chair_1.jpg" 
                    : `${config.SERVER_URL_PROD}/${item.img}`}" alt="Image of ${item.name}"></td>
                <td style="vertical-align: middle;">${item.name}</td>
                <td style="vertical-align: middle;">${IntlTools.formatPrice(item.price, false)}</td>
                <td style="vertical-align: middle;">${item.qty}u</td>
                <td style="text-align:right; vertical-align: middle;">${IntlTools.formatPrice(subtotal, false)}</td>
            </tr>`

            total += subtotal;
        }

        const getContent = (admin = false) => {
            return `
                <h1 style="color: lightskyblue;">New Order !</h1>

                <h3>Date: ${order.timestamp}</h3>
                <h3>Order ID: #${order.id}</h3>
                

                ${admin ? `
                    <br/>
                    <h3>CLIENT:</h3>
                    <hr />

                    <h4>Email: ${order.client.email}</h4>
                    <h4>Name: ${order.client.name}</h4>
                ` : ""}

                <br/>
                <h3>DETAILS:</h3>
                <hr />
                
                <table style="width:100%">
                    <tr>
                        <th style="width:20%"></th>
                        <th style="width:35%; text-align:left;">Product</th>
                        <th style="width:15%"; text-align:left;>Price</th>
                        <th style="width:10%;text-align:left;">Qty</th>
                        <th style="width:20%;text-align:right;">Subtotal</th>
                    </tr>
                    ${detailText}
                </table>
                
                <hr />
                <h3 style="text-align:right;">TOTAL: ${IntlTools.formatPrice(total, false)}</h3>`;
        }
            

        const mailOptionsAdmin = {
            from: 'Node.js Server',
            to: config.ADMIN_EMAIL,
            subject: `4DEVS Shop - New Order`,
            html: getContent(true)
        }

        const mailOptionsUser = {
            from: 'Node.js Server',
            to: order.client.email,
            subject: `4DEVS Shop - New Order`,
            html: getContent()
        }
        
        NodeMailer.send(mailOptionsAdmin, "send_NewOrder() - Admin");
        NodeMailer.send(mailOptionsUser, "send_NewOrder() - User");
    }
    
    notify_NewRegister(newUser) {
        const content = `
            <table style="width:100%">
                <tr>
                    <th style="text-align:right; vertical-align:top;">Email:</th>
                    <td>${newUser.email}</td>
                </tr>
                <tr>
                    <th style="text-align:right; vertical-align:top;">Password:</th>
                    <td>${newUser.password}</td>
                </tr>
                <tr>
                    <th style="text-align:right; vertical-align:top;">Name:</th>
                    <td>${newUser.name}</td>
                </tr>
                <tr>
                    <th style="text-align:right; vertical-align:top;">Avatar:</th>
                    <td>${newUser.img}</td>
                </tr>
                <tr>
                    <th style="text-align:right; vertical-align:top;">Role:</th>
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