// Import sequelize instance and fields from database model (require)
const {sequelize_instance, todos} = require("../models/index")

/**
 * Get the list of todo items (Direct communication with postgres)
 * @return list A list of all items from the todo list
 * @throws error When something goes wrong with findAll()
 */
async function get_list_action() {
    try {
        const list = await todos.findAll()
        return list
    } catch (error) {
        console.error(error)
        throw error
    }
}

/**
 * Get an item from todo list (Direct communication with postgres)
 * @param item_id The id for the required item
 * @return item The collected item based on the given id
 * @throws error When something goes wrong with findByPk()
 */
async function get_item_action(item_id) {
    try {
        const item = await todos.findByPk(item_id)
        return item
    } catch (error) {
        console.error(error)
        throw error
    }
}

/**
 * Create an item in the todo list (Direct communication with postgres)
 * @param item The item being created in the database
 * @return created_item The created item in the database
 * @throws error When something goes wrong with create()
 */
async function create_item_action(item) {
    var date_time = new Date()
    try {
        const created_item = await todos.create({ title: item.title, description: item.description, date_created: date_time, date_updated: date_time })
        return created_item
    } catch (error) {
        console.error(error)
        throw error
    }
}

/**
 * Update an item in the todo list (Direct communication with postgres)
 * @param item_id The item id from the item which is going to be updated
 * @param item The item that is going to be updated
 * @throws error When something goes wrong with update()
 */
async function update_item_action(item_id, item) {
    try {
        await todos.update({ title: item.title, description: item.description, date_updated: item.date_updated, date_completed: item.date_completed}, {where: {id: item_id}})
    } catch (error) {
        console.error(error)
        throw error
    }
}

/**
 * Delete an item in the todo list (Direct communication with postgres)
 * @param item_id The item id from the item which is going to be updated
 * @throws error When something goes wrong with destroy()
 */
async function delete_item_action(item_id) {
    try {
        await todos.destroy({ where: {id: item_id}})
    } catch (error) {
        console.error(error)
        throw error
    }
}

// Export all actions for services to be based on
module.exports = {
    get_list_action,
    get_item_action,
    create_item_action,
    update_item_action,
    delete_item_action
}
