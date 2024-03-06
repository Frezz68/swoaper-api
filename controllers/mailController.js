const { Resend } = require("resend");

const resend = new Resend(process.env.API_KEY_RESEND);

exports.contactSendMail = async (req, res) => {
    try {
        const { email, objet, message, pieceJointe } = req.body;
        if (!email && !objet && !message) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        const { data, error } = await resend.emails.send({
            from: 'no_reply@swoaper.com',
            to: ['lucasperez.apple@gmail.com',email],
            subject: objet,
            html:'<p>'+message+'</p><br>',
            attachments: pieceJointe
        });
        if (error) {
            console.log(error);
            return res.status(400).json({ message: error.message });
        }
        res.status(200).json(data);
    } catch (err) {
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