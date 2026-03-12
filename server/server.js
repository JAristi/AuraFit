require('dotenv').config();
const db = require("./models");
const app = require("./index");

const PORT = process.env.PORT || 8080;

// Primero autenticar con la base de datos
db.sequelize.authenticate()
    .then(() => {
        console.log("✅ Conexión a la base de datos establecida correctamente.");

        // Sincronizar modelos con la base de datos
        return db.sequelize.sync();
    })
    .then(() => {
        console.log("✅ Modelos sincronizados con la base de datos.");

        // Solo iniciar el servidor si la conexión a la BD fue exitosa
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en el puerto ${PORT}.`);
        });
    })
    .catch((err) => {
        console.error("❌ No se pudo conectar a la base de datos:", err.message);
        process.exit(1);
    });
