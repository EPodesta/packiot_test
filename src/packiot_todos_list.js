// Import express, body-parser (require)
const express = require('express')
const bodyParser = require('body-parser')

// Import database model and database services (require)
const database = require("./models/database_model");
const database_services = require('./services/database_services')

// Set app port
const app_port = 3000

// Create database table specified inside models
database.sequelize_instance.sync();

// Setup request and responses
const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// Setup root endpoint
app.get('/', (request, response) => {
    response.json({
        info: 'Packiot Test with Nodejs, Express and Postgresql'
    })
})

// Setup Packiot specific endpoints
app.get('/todos', database_services.get_list_service)
app.get('/todos/:id', database_services.get_item_service)
app.post('/todos', database_services.create_item_service)
app.put('/todos/:id', database_services.update_item_service)
app.delete('/todos/:id', database_services.delete_item_service)

// Run
app.listen(app_port, () => {
    console.log(`Running on port ${app_port}.`)
})

// Export app for tests
module.exports = app
