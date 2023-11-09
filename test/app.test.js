// Import server from main file
const app = require("../src/packiot_todos_list")

// Import chai for testing
let chai = require("chai")
let chaiHttp = require("chai-http")

// Import todos database
const { todos } = require("../src/models/index")
let should = chai.should()

/**
 * Test function to create an item with a missing title
 */
function create_with_missing_title() {
        it("Create an item with missing title", (done) => {
            let item = {
                description: "This is a test description",
            }
            chai.request(app)
                .post("/todos")
                .send(item)
                .end((error, response) => {
                    response.should.have.status(500)
                    response.body.should.have.property("error")
                    done()
                })
        })
}

/**
 * Test function to create an item with a missing description
 */
function create_with_missing_description() {
        it("Create an item with missing description", (done) => {
            let item = {
                title: "This is a test title",
            }
            chai.request(app)
                .post("/todos")
                .send(item)
                .end((error, response) => {
                    response.should.have.status(500)
                    response.body.should.have.property("error")
                    done()
                })
        })
}


/**
 * Test function to create an item without problems
 */
function create_without_problems() {
        it("Create an item without problems", (done) => {
            let item = {
                title: "This is a test title",
                description: "This is a test description"
            }
            chai.request(app)
                .post("/todos")
                .send(item)
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.have.property("message")
                    response.body.message.should.equal("Created item!")
                    done()
                })
        })
}

/**
 * Test function to get an invalid item
 */
function get_invalid_item() {
        it("Get invalid item id", (done) => {
            chai.request(app)
                .get("/todos/987654")
                .end((error, response) => {
                    response.should.have.status(404)
                    response.body.error.should.equal("There is not an item with the given id...")
                    done()
                })
        })
}

/**
 * Test function to get all items
 */
function get_list() {
        it("Get all items", (done) => {
            chai.request(app)
                .get("/todos")
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.have.property("data")
                    done()
                })
        })
}

/**
 * Test function to update an invalid item
 */
function update_invalid_item() {
        it("Update invalid item", (done) => {
            chai.request(app)
                .put("/todos/987654")
                .end((error, response) => {
                    response.should.have.status(404)
                    response.body.error.should.equal("There is not an item with the given id...")
                    done()
                })
        })
}

/**
 * Test function to delete an invalid item
 */
function delete_invalid_item() {
        it("Delete invalid item id", (done) => {
            chai.request(app)
                .delete("/todos/987654")
                .end((error, response) => {
                    response.should.have.status(404)
                    response.body.error.should.equal("There is not an item with the given id...")
                    done()
                })
        })
}

chai.use(chaiHttp)
describe("---------------------- Packiot CRUD API Test -------------------------", () => {
    describe("POST endpoint - Create", () => {
        //Test 1
        create_with_missing_title()

        //Test 2
        create_with_missing_description()

        //Test 3
        create_without_problems()

    })
    describe("GET endpoint - Get item", () => {
        // Create dummy item
        let created_item = {}
        const date_time = new Date()
        before( async () => {
            const item = {
                                title: "Generic item title",
                                description: "Generic item description",
                                date_created: date_time,
                                date_updated: date_time
                            }
            try {
                created_item = await todos.create( {title: item.title, description: item.description, date_created: item.date_created, date_updated: item.date_updated })
            } catch (err) {
                console.error(err)
            }
        })

        // Test 4
        get_invalid_item()

        // Test 5
        // IMPORTANT: Because of the Promise context, could not isolate this in a function,
        // more study is needed. Could not figure out how to solve this
        it("Get item with correct id", (done) => {
            chai.request(app)
                .get(`/todos/${created_item.id}`)
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.have.property("data")
                    response.body.message.should.equal("Fetched item!")
                    response.body.data.id.should.equal(created_item.id)
                    response.body.data.title.should.equal("Generic item title")
                    response.body.data.description.should.equal("Generic item description")
                    done()
                })
        })

        // Test 6
        get_list()
    })

    describe("PUT endpoint - Update item", () => {
        // Create dummy item
        let created_item = {}
        const date_time = new Date()
        before( async () => {
            try {
                const item = {
                                    title: "Generic item title",
                                    description: "Generic item description",
                                    date_create: date_time,
                                    date_updated: date_time,
                                }
                created_item = await todos.create({title: item.title, description: item.description, date_created: item.date_create, date_updated: item.date_updated })
            } catch (err) {
                console.error(err)
            }
        })

        // Test 7
        update_invalid_item()

        // Test 8
        // IMPORTANT: Because of the Promise context, could not isolate this in a function,
        // more study is needed. Could not figure out how to solve this
        it("Update item with correct id", (done) => {
            created_item.description = "something else"
            created_item.date_completed = date_time
            chai.request(app)
                .put(`/todos/${created_item.id}`)
                .send(created_item)
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.have.property("message")
                    response.body.message.should.equal("Updated item!")
                    done()
                })
        })

    })

    describe("DELETE endpoint - Delete item", () => {
        // Create dummy item
        let created_item = {}
        before( async () => {
            try {
                const date_time = new Date()
                const item = {
                                    title: "Generic item title",
                                    description: "Generic item description",
                                    date_created: date_time,
                                    date_updated: date_time
                                }
                created_item = await todos.create( {title: item.title, description: item.description, date_created: date_time, date_updated: date_time })
            } catch (err) {
                console.error(err)
            }
        })

        // Test 9
        delete_invalid_item()

        // Test 10
        // IMPORTANT: Because of the Promise context, could not isolate this in a function,
        // more study is needed. Could not figure out how to solve this
        it("Delete item with correct id", (done) => {
            chai.request(app)
                .delete(`/todos/${created_item.id}`)
                .send(created_item)
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.have.property("message")
                    response.body.message.should.equal("Deleted item!")
                    done()
                })
        })
    })
})
