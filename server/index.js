const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Nutrition and Training API." });
});

require("./routes/auth.routes")(app);
require("./routes/plan.routes")(app);
require("./routes/progress.routes")(app);
require("./routes/meal.routes")(app);

module.exports = app;
