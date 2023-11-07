const router = require("express").Router();
const argon2 = require("argon2");
const client = require("../DB/db");

// FaunaDB APIs
const { Create, Collection } = require("faunadb").query;

// JWT & secret
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

// Create a user
router.post("/create-user", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await argon2.hash(password);

  try {
    const createdUser = await client.query(
      Create(Collection("users"), { data: { email, password: hashedPassword } })
    );

    // signing JWT token
    const data = {
        user: {
            id: createdUser.ref.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET)

    // Sending a JSON response with the user data
    res.status(200).json({
      message: "Successfully Created A New User",
      authToken
    });
  } catch (error) {
    console.log(error);
    // Sending an error response as JSON
    res.status(500).json({
      message: "Server Error Occurred! Couldn't create a user",
      error: error.message, // You can include more specific error information if needed
    });
  }
});

router.get("/login", async (req, res) => {
  const { email, password } = req.body;
});

module.exports = router;
