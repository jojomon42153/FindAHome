const { mailsToSend } = require("../../config/criteria");

module.exports = (apparts) => {

    const nodemailer = require("nodemailer");
    //Création du transporteur SMTP
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "jojomon42153@gmail.com",
            pass: "Pg4pvduracell@Google",
        }
    });
    //Creation du mail a envoyer
    let html = "<html>";
    apparts.forEach(element => {
        html += "<h1>" + element.from + "</h1>";
        html += "<h2>" + element.title + "</h2>";
        html += "<p>" + element.url + "</p>";
        html += "<p>" + element.price + "</p>";
        //title
        //link or url
        //price
    });
    const mail = {
        from: "< FindAHome Bot >",
        to: mailsToSend,
        subject: "De nouveaux appartements sont disponibles",
        html,
    };
    //Envoi du mail
    return (new Promise((resolve, reject) => {
        transporter.sendMail(mail, (err) => {
            if (err) {
                reject({ status: "KO", err });
            } else {
                resolve({ status: "OK" });
            }
            transporter.close();
        });
    }));
};
