module.exports = (sequelize, Sequelize) => {
    const Workout = sequelize.define("workout", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING, // e.g., 'Empuje (Pecho)', 'Full Body'
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        exercises: {
            type: Sequelize.JSON, // Array of exercise IDs or simplified objects
            allowNull: true
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['userId', 'date']
            }
        ]
    });

    return Workout;
};
