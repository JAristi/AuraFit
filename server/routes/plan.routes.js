const plans = require("../controllers/plan.controller");

module.exports = function (app) {
    app.post("/api/plans", plans.create);
    app.get("/api/plans", plans.findAll);
};
