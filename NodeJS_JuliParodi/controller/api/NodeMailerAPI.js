
let transport = require('../../mailer/mailer');


exports.send_email =  function (req, res) {
    console.log('sending email..');
    const message = {
        from: 'jstutorials@gmail.com', // Sender address
        to: 'to emailId',         // recipients
        subject: 'test mail from Nodejs', // Subject line
        text: 'Successfully! received mail using nodejs' // Plain text body
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('mail has sent.');
            console.log(info);
        }
    });
};