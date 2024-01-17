const jwt = require("jsonwebtoken");

let tokenBlacklist = []; // Liste noire de jetons

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé, jeton JWT manquant ou mal formé" });
  }

  const token = authHeader.split(" ")[1];

  // Vérifiez si le jeton est dans la liste noire
  if (tokenBlacklist.includes(token)) {
    return res.status(401).json({ message: "Jeton invalide ou expiré" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute les données de l'utilisateur à la requête pour un usage ultérieur
    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ message: "Accès non autorisé, jeton JWT non valide" });
  }
};

module.exports = {
  requireAuth,
  requireAdmin,
};
