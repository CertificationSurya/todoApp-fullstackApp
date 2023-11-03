const faunadb = require("faunadb")
require("dotenv").config()

const client = new faunadb.Client({
    secret: process.env.DB_KEY
})

module.exports = client