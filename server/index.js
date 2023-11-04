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

// getting all documents
// app.get("/", async (req, res) => {
//   const doc = await client.query(
//     Map(
//         Paginate(Documents(Collection('todos'))),
//         Lambda('doc', Get(Var("doc")))
//       )
//   );
//   console.log(doc.data);

//   res.send("Very minimal setup");
// });

app.listen(port, () => console.log("SERVER is running in the port", port));
