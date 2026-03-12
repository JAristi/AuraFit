const meals = require("../controllers/meal.controller");
const verifyToken = require("../middleware/auth.middleware");

module.exports = function (app) {
    app.post("/api/meals", verifyToken, meals.create);
    app.put("/api/meals/:id", verifyToken, meals.update);
    app.delete("/api/meals/:id", verifyToken, meals.delete);
    app.get("/api/meals", verifyToken, meals.findByDate);
    app.get("/api/meals/summary", verifyToken, meals.getDailySummary);
    app.get("/api/meals/range", verifyToken, meals.findByDateRange);
};
