
const transporter = require("./email.config")


const sendMail = ({ from = "Team CT", email, subject = "Test Email", text = "Send Code Email", html = ``}) => {
    transporter.sendMail({
        from: from, // sender address
        to: email, // list of recipients
        subject: subject, // subject line
        text: text, // plain text body
        html: html,
    });
}


module.exports = {sendMail}