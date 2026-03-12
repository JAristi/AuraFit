module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        googleId: {
            type: Sequelize.STRING,
            allowNull: true
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "user"
        }
    });

    return User;
};
