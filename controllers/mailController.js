const e = require("express");
const { Resend } = require("resend");

const resend = new Resend(process.env.API_KEY_RESEND);

exports.contactSendMail = async (req, res) => {
    try {
        const { email, objet, message } = req.body;
        const pieceJointe = req.files;
    
        if (!email && !objet && !message) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        if(pieceJointe.length > 5){
            return res.status(400).json({ message: "Nombre de pièces jointes limité à 5" });
        }
        const { data, error } = await resend.emails.send({
            from: 'no_reply@contact.swoaper.com',
            to: [process.env.EMAIL_NOLAN,email],
            subject: objet,
            html:'<span>Voici un recap de ce qui est envoyé :</span><br><p>'+message+'</p><br>',
            attachments: pieceJointe.map(file => {
                return {
                    filename: file.originalname,
                    content: file.buffer
                }
            })
        });
        if (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
};

exports.motDePasseOublie = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email est requis" });
        }
        const { data  } = await resend.emails.send({
            from: 'no_reply@swoaper.com',
            to: email,
            subject: 'Réinitialisation de mot de passe',
            html:'<p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien suivant pour le réinitialiser</p><br>',
        });
        res.status(200).json(data);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}