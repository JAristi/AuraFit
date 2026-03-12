const progress = require("../controllers/progress.controller");
const verifyToken = require("../middleware/auth.middleware");

module.exports = function (app) {
    app.post("/api/progress", verifyToken, progress.create);
    app.get("/api/progress", verifyToken, progress.findByRange);
    app.get("/api/progress/streak", verifyToken, progress.getStreak);
};
