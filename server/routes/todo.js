const router = require("express").Router();
// importing middleware
const fetchUser = require("../middleware/fetchuser");

const client = require("../DB/db");
const {
  Create,
  Get,
  Update,
  Delete,
  Ref,
  Collection,
  Map,
  Paginate,
  Match,
  Index,
  Lambda,
  Var,
  Documents,
} = require("faunadb").query;

// const values
const COLLECTION_NAME = "todos";

// Fetch All TODOS
router.get("/get-todos", async (req, res) => {
  try {
    const doc = await client.query(
      Map(
        Paginate(Documents(Collection(COLLECTION_NAME))),
        Lambda("doc", Get(Var("doc")))
      )
    );
    res.json(doc.data);
  } catch (error) {
    res.status(500).send("Internal Error Occured");
  }
});

// Fetch Single Document / Todo
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await client.query(Get(Ref(Collection(COLLECTION_NAME), id)));
    res
      .status(200)
      .json({ message: "Successfully Fetched Data", document: createdDoc });
  } catch (error) {
    res.status(404).json({ message: "Data Not Found In Our Database" });
  }
});

// Create document / Todo
router.post("/add-todo", async (req, res) => {
  const data = req.body;
  try {
    const createdDoc = await client.query(
      Create(Collection("todos"), { data })
    );
    res.status(200).json({
      message: "Successfully Created A New Todo",
      document: createdDoc,
    });
  } catch (error) {
    res.status(500).send("Server Error Occured");
  }
});

// Update Single Document / Todo
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedDoc = await client.query(
      Update(Ref(Collection(COLLECTION_NAME), id), { data })
    );
    res
      .status(200)
      .json({ message: "Successfully Fetched Data", document: updatedDoc });
  } catch (error) {
    res.status(404).json({ message: "Data Not Found In Our Database" });
  }
});

// Delete Single Documents / Todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDoc = await client.query(
      Delete(Ref(Collection(COLLECTION_NAME), id))
    );
    res
      .status(200)
      .json({ message: "Successfully Deleted a Todo", document: deletedDoc });
  } catch (error) {
    res.status(500).json({ message: "Error Occured while deleting Todo" });
  }
});

module.exports = router;
