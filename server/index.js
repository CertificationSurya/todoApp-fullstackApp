const cors = require("cors");
const app = require("express")();
require("dotenv").config();

// Database connection
const client = require("./DB/db");
const { Get, Ref, Collection, Map, Paginate, Match, Index, Lambda, Var, Documents  } = require("faunadb").query;

const port = process.env.PORT || 8080;

// cors
app.use(cors());

// TODO: Separate routes and server functionality

// getting all documents
app.get("/", async (req, res) => {
  const doc = await client.query(
    Map(
        Paginate(Documents(Collection('todos'))),
        Lambda('doc', Get(Var("doc")))
      )
  );
  console.log(doc.data);

  res.send("Very minimal setup");
});

app.listen(port, () => console.log("SERVER is running in the port", port));
