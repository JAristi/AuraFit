module.exports = (sequelize, Sequelize) => {
    const Plan = sequelize.define("plan", {
        userId: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING // nutrition or training
        },
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return Plan;
};
