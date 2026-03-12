const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.plans = require("./plan.model.js")(sequelize, Sequelize);
db.progress = require("./progress.model.js")(sequelize, Sequelize);
db.meals = require("./meal.model.js")(sequelize, Sequelize);

// Associations
db.users.hasMany(db.progress, { foreignKey: 'userId' });
db.progress.belongsTo(db.users, { foreignKey: 'userId' });
db.users.hasMany(db.meals, { foreignKey: 'userId' });
db.meals.belongsTo(db.users, { foreignKey: 'userId' });

module.exports = db;
