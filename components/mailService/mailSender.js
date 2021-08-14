import { createTransport } from "nodemailer";
const hbs = require('nodemailer-express-handlebars');

const getEmailData = (mailDetails, template) => {
    let data = null;
    switch (template) {
        //In case you have different types of emails to send, a switch is usually ideal for the situation
        case "purchase":
            data = {
                from: "Envy <evny@envymail.com>",
                to: mailDetails.userEmail,
                subject: "Purchase Confirmation",
                template: 'purchase',
                context: {
                    name: mailDetails.name,
                    amount: mailDetails.amount
                },
                text: 'Your ticket purchase has been confirmed successfully'
            }
            break;

        default:
    }
    return data;
}

export const sendEmail = (mailDetails, type) => {
    //Using https://mailtrap.io to capture all emails within the same inbox.. Good for testing email functionalities in apps
    const smtpTransport = createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        debug: true,
        logger: true,
        auth: {
            user: process.env.NEXT_PUBLIC_SMTP_EMAIL,
            pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD
        }
    });

    smtpTransport.use('compile', hbs({
        viewEngine: {
            partialsDir: "./components/mailService/mailTemplates/",
            defaultLayout: ""
        },
        viewPath: './components/mailService/mailTemplates/',
        extName: ".handlebars"
    }));

    smtpTransport.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const mail = getEmailData(mailDetails, type);

    smtpTransport.sendMail(mail, function (error, response) {
        console.log("sendmail breakpoint");
        if (error) {
            console.log(error)
        } else {
            console.log(" email sent successfully")
        }
        smtpTransport.close();
    })

}