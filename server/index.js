const cors = require("cors");
const express = require("express");
const app = express()
require("dotenv").config();

const port = process.env.PORT || 8080;

// cors
app.use(cors());
app.use(express.json())

// todo Route
app.use("/api/todo", require("./routes/todo"))
app.use("/api/auth", require("./routes/auth"))


app.listen(port, () => console.log("SERVER is running in the port", port));
