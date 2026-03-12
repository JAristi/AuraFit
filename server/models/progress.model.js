module.exports = (sequelize, Sequelize) => {
    const Progress = sequelize.define("progress", {
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        calories: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        weight: {
            type: Sequelize.FLOAT,
            allowNull: true
        },
        activityType: {
            type: Sequelize.STRING,
            allowNull: true
        },
        activityDuration: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        notes: {
            type: Sequelize.TEXT,
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

    return Progress;
};
