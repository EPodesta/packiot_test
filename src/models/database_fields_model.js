// Import DataTypes from Sequelize (require)
const { DataTypes } = require("sequelize")

// Export the database model for the todo list
module.exports = (sequelize_instance) => {
	const todos = sequelize_instance.define("todos", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		date_created: {
			type: DataTypes.DATE,
		},
		date_updated: {
			type: DataTypes.DATE,
		},
		date_completed: {
			type: DataTypes.DATE,
		},
	})
	return todos
}
