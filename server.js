
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, description, location, email, helpdesk, formType } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'YOUR_ETHEREAL_USER', // generated ethereal user
            pass: 'YOUR_ETHEREAL_PASSWORD'  // generated ethereal password
        }
    });

    let mailOptions = {};

    if (formType === 'found') {
        mailOptions = {
            from: '"Help Desk" <no-reply@helpdesk.com>',
            to: email,
            subject: 'Item Found',
            text: `Hello ${name},

Thank you for reporting a found item.

Item: ${name}
Description: ${description}
Found Location: ${location}
Helpdesk Location: ${helpdesk}

We will keep you updated.

Thanks,
Help Desk Team`
        };
    } else if (formType === 'lost') {
        mailOptions = {
            from: '"Help Desk" <no-reply@helpdesk.com>',
            to: email,
            subject: 'Item Lost',
            text: `Hello ${name},

We have received your report for a lost item.

Item: ${name}
Description: ${description}
Last Seen Location: ${location}

We will do our best to find it.

Thanks,
Help Desk Team`
        };
    }


    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.status(200).send('Email sent successfully');
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
