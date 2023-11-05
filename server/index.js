const cors = require("cors");
const express = require("express");
const app = express()
require("dotenv").config();

// Database connection
const client = require("./DB/db");
const { Get, Ref, Collection, Map, Paginate, Match, Index, Lambda, Var, Documents  } = require("faunadb").query;

const port = process.env.PORT || 8080;

// cors
app.use(cors());
app.use(express.json())

// TODO: Separate routes and server functionality


// todo Route
app.use("/api/todo", require("./routes/todo"))
// app.use("/api/auth", require("./routes/auth"))


app.listen(port, () => console.log("SERVER is running in the port", port));
