module.exports = (sequelize, Sequelize) => {
    const Exercise = sequelize.define("exercise", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING, // e.g., 'Fuerza', 'Cardio', 'Yoga'
            allowNull: false
        },
        muscleGroup: {
            type: Sequelize.STRING, // e.g., 'Pecho', 'Piernas', 'Espalda'
            allowNull: true
        },
        equipment: {
            type: Sequelize.STRING, // e.g., 'Mancuernas', 'Barra', 'Ninguno'
            allowNull: true
        },
        difficulty: {
            type: Sequelize.STRING, // e.g., 'Principiante', 'Intermedio', 'Avanzado'
            allowNull: true
        },
        instructions: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return Exercise;
};
