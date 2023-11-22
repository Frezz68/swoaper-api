// middleware/auth.js
const jwt = require("jsonwebtoken");

// Middleware d'authentification avec Passport et la stratégie JWT
const requireAuth = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res
            .status(401)
            .json({ message: "Accès non autorisé, jeton JWT manquant" });
    } else {
        next();
    }
};

const requireAdmin = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];

    try {
        // Vérifiez et décodez le jeton JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Récupérez le rôle de l'utilisateur à partir du jeton
        const userRoles = decoded.roles;

        // Vérifiez si l'utilisateur a le rôle nécessaire (par exemple, "ROLE_ADMIN")
        if (userRoles.includes("ROLE_ADMIN")) {
            // L'utilisateur a le rôle requis
            next();
        } else {
            return res
                .status(403)
                .json({ message: "Accès non autorisé, rôle insuffisant" });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Accès non autorisé, jeton JWT non valide",
        });
    }
};

module.exports = {
    requireAuth,
    requireAdmin,
};
