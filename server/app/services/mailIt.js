const { mailsToSend, user, pass } = require("../../config/criteria");

module.exports = (apparts) => {

    const nodemailer = require("nodemailer");
    //Création du transporteur SMTP
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user,
            pass,
        }
    });
    //Creation du mail a envoyer
    let html = "<html>";
    apparts.forEach(element => {
        html += "<h1>" + element.title + "</h1>";
        html += "<p><img src=\"" + element.images[0] + "\"/></p>;",
        html += "<p> Lien: " + element.url + "</p>";
        html += "<p> Prix: " + element.price + "</p>";
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
                console.log("Mail send");
                resolve({ status: "OK" });
            }
            transporter.close();
        });
    }));
};
