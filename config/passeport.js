const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/user"); // Assurez-vous d'importer votre modèle User

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(jwtOptions, (jwt_payload, done) => {
        // Recherchez l'utilisateur dans la base de données par son ID (sub dans le jeton JWT)
        User.findById(jwt_payload.sub, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    })
);

module.exports = passport;
