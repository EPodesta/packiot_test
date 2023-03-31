// Import Sequelize (require)
const Sequelize = require("sequelize");

// Create an instance of postgres
const sequelize_instance = new Sequelize("packiot_todos", "packiot_user", "packiot", {
	host: "localhost",
	port: 5432,
	dialect: "postgres",
});

// Build database
const database = {};
database.sequelize_instance = sequelize_instance;
database.todos = require("./database_fields_model")(sequelize_instance);

// Export database
module.exports = database;
