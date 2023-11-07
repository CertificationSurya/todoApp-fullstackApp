const cors = require("cors");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const port = process.env.PORT || 8080;
const ALLOWED_URL = "http://localhost:3000";

app.use(express.json());
// cors
app.use(
  cors({
    origin: [ALLOWED_URL],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true, // for cookies sending
  })
);
app.use(cookieParser());

// todo Route
app.use("/api/todo", require("./routes/todo"));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => console.log("SERVER is running in the port", port));
