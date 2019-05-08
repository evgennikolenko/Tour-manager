const nodemailer = require('nodemailer');

module.exports.sendMail = (opts) => {
    let mailOpts;
    let smtpTransport;

    smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'testtourmanager@gmail.com',
            pass: 'manager007'
        }
    });

    mailOpts = {
        from: opts.from,
        to: opts.to,
        subject: opts.subject,
        text: opts.text,
        html: opts.html
    };

    smtpTransport.sendMail(mailOpts, function(error, response) {
        if (error) {
            console.log(error);
        }
        smtpTransport.close();
    });
}
