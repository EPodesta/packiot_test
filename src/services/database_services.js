// Import from database_actions functions to create services (require)
const {
    get_list_action,
    get_item_action,
    create_item_action,
    update_item_action,
    delete_item_action
} = require("../actions/database_actions")

/**
 * Verify if the creation request has all fields
 * @param request The create request
 * @return {Bool} If its false, there is missing fields; if not, validation is ok
 */
function validate_creation_request(request) {
    if (request.body.title) {
        if (request.body.description) {
            return false
        }
    }
    return true
}

/**
 * Get the list of todo items (Service)
 * @param request GET list request
 * @param response GET list response
 * @return res The service response
 * @throws error When something goes wrong with get_list_action() or any
 * response method call
 */
async function get_list_service(request, response) {
    try {
        const list = await get_list_action()
        res = response.status(200).send({ data: list, message: "Fetched list!" })
        return res
    } catch (error) {
        console.error(error)
        res = response.status(500).send({ error: "Error: list fetch failed..." })
        return response
    }
}

/**
 * Get the item from todo list (Service)
 * @param request GET item request
 * @param response GET item response
 * @return res The service response
 * @throws error When something goes wrong with get_item_action() or any
 * response method call
 */
async function get_item_service(request, response) {
    try {
        const item_id = request.params.id
        const returned_item = await get_item_action(item_id)
        if (returned_item === null) {
            res = response.status(404).send({ error: "There is not a item with the given id..." })
            return res
        }
        res = response.status(200).send({ data: returned_item, message: "Fetched item!" })
        return res
    } catch (error) {
        console.error(error)
        res = response.status(500).send({ error: "Error: item fetch failed..." })
        return res
    }
}

/**
 * Create an item in the todo list (Service)
 * @param request POST item request
 * @param response POST item response
 * @return res The service response
 * @throws error When something goes wrong with create_item_action(),
 * validate_creation_request method or any response method call
 */
async function create_item_service(request, response) {
    try {
        if (validate_creation_request(request)) {
            throw new Error()
        }
        const item = request.body
        const created_item = await create_item_action(item)
        res = response.status(200).send({ data: created_item, message: "Created item!" })
        return res
    } catch (error) {
        console.error(error)
        res =  response.status(500).send({ error: "Error: item creation failed..." })
        return res
    }
}

/**
 * Update an item in the todo list (Service)
 * @param request PUT item request
 * @param response PUT item response
 * @return res The service response
 * @throws error When something goes wrong with get_item_action(),
 * update_item_action or any response method call
 */
async function update_item_service(request, response) {
    try {
        const item_id = request.params.id
        const returned_item = await get_item_action(item_id)
        if (returned_item === null) {
            res = response.status(404).send({ error: "There is not a item with the given id..." })
            return res
        }
        const item = request.body
        await update_item_action(item_id, item)
        res = response.status(200).send({ message: "Updated item!" })
        return res
    } catch (error) {
        console.error(error)
        res = response.status(500).send({ error: "Error: item update failed..." })
        return res
    }
}

/**
 * Delete an item in the todo list (Service)
 * @param request DELETE item request
 * @param response DELETE item response
 * @return res The service response
 * @throws error When something goes wrong with get_item_action(),
 * delete_item_action or any response method call
 */
async function delete_item_service(request, response) {
    try {
        const item_id = request.params.id
        const returned_item = await get_item_action(item_id)
        if (returned_item === null) {
            res = response.status(404).send({ error: "There is not a item with the given id..." })
            return res
        }
        await delete_item_action(item_id)
        res = response.status(200).send({ message: "Deleted item!" })
        return res
    } catch (error) {
        console.error(error)
        res = response.status(500).send({ error: "Error: item deletion failed..." })
        return res
    }
}

// Export services
module.exports = {
    get_list_service,
    get_item_service,
    create_item_service,
    update_item_service,
    delete_item_service
}
