module.exports = (sequelize, Sequelize) => {
    const Meal = sequelize.define("meal", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        mealType: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isIn: [['desayuno', 'almuerzo', 'comida', 'snack']]
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        calories: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        proteins: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        carbs: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        fats: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        notes: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    });

    return Meal;
};
