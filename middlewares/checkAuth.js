import passport from "passport";

module.exports = {
    checkAuth(req, res, next) {
        
        passport.authenticate(
          "jwt",
          { session: false },
          (err, decryptToken, jwtError) => {
            if (jwtError || err) {
                req.error = err || jwtError;
            } else {
                req.user = decryptToken;
            }
            
            next();
          }
        )(req, res, next);
    }
} 