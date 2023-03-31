const app = require("../src/packiot_todos_list")

let chai = require("chai")
let chaiHttp = require("chai-http")
const {sequelize_instance, todos} = require("../src/models/database_model")
let should = chai.should()

chai.use(chaiHttp)
describe("---------------------- Packiot CRUD API Test -------------------------", () => {
    describe("POST endpoint - Create", () => {
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

        it("Create an item without any problems", (done) => {
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

        after(async () => {})
    })
    describe("GET endpoint - Get item", () => {
        let created_item = {}

        before( async () => {
            const date_time = new Date()
            const todo_item = {
                                title: "Generic item title",
                                description: "Generic item desciprtion",
                                date_created: date_time,
                                date_updated: date_time
                            }
            try {
                created_item = await todos.create( {title: todo_item.title, description: todo_item.description, date_created: date_time, date_updated: date_time })
            } catch (err) {
                console.error(err)
            }
        })

        it("Get unexisting item id", (done) => {
            chai.request(app)
                .get("/todos/987654")
                .end((error, response) => {
                    response.should.have.status(404)
                    response.body.error.should.equal("There is not a item with the given id...")
                    done()
                })
        })

        it("Get item with correct id", (done) => {
            chai.request(app)
                .get(`/todos/${created_item.id}`)
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.have.property("data")
                    response.body.message.should.equal("Fetched item!")
                    response.body.data.id.should.equal(created_item.id)
                    response.body.data.title.should.equal("Generic item title")
                    response.body.data.description.should.equal("Generic item desciprtion")
                    done()
                })
        })

        it("Get all items", (done) => {
            chai.request(app)
                .get("/todos")
                .end((error, response) => {
                    response.should.have.status(200)
                    response.body.should.have.property("data")
                    done()
                })
        })
    })

    describe("PUT endpoint - Update item", () => {
        let created_item = {}
        before( async () => {
            try {
                const date_time = new Date()
                const todo_item = {
                                    title: "Generic item title",
                                    description: "Generic item desciprtion",
                                    date_created: date_time,
                                    date_updated: date_time
                                }
                created_item = await todos.create( {title: todo_item.title, description: todo_item.description, date_created: date_time, date_updated: date_time })
            } catch (err) {
                console.error(err)
            }
        })

        it("Update unexisting item id", (done) => {
            chai.request(app)
                .put("/todos/987654")
                .end((error, response) => {
                    response.should.have.status(404)
                    response.body.error.should.equal("There is not a item with the given id...")
                    done()
                })
        })

        it("Update item with correct id", (done) => {
            created_item.description = "something else"
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
        let created_item = {}
        before( async () => {
            try {
                const date_time = new Date()
                const todo_item = {
                                    title: "Generic item title",
                                    description: "Generic item desciprtion",
                                    date_created: date_time,
                                    date_updated: date_time
                                }
                created_item = await todos.create( {title: todo_item.title, description: todo_item.description, date_created: date_time, date_updated: date_time })
            } catch (err) {
                console.error(err)
            }
        })

        it("Delete unexisting item id", (done) => {
            chai.request(app)
                .delete("/todos/987654")
                .end((error, response) => {
                    response.should.have.status(404)
                    response.body.error.should.equal("There is not a item with the given id...")
                    done()
                })
        })

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
