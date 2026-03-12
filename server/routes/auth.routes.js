const auth = require("../controllers/auth.controller");

module.exports = function (app) {
    app.post("/api/auth/signup", auth.signup);
    app.post("/api/auth/signin", auth.signin);
    app.post("/api/auth/google", auth.googleSignin);
};
