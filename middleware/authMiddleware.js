const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé, jeton JWT manquant ou mal formé" });
  }

  const token = authHeader.split(" ")[1];
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

const requireAdmin = (req, res, next) => {
  const userRoles = req.user.roles;

  if (userRoles && userRoles.includes("ROLE_ADMIN")) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Accès non autorisé, rôle insuffisant" });
  }
};

module.exports = {
  requireAuth,
  requireAdmin,
};
