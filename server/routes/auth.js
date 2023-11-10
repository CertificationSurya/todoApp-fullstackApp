const router = require("express").Router();
const argon2 = require("argon2");
const client = require("../DB/db");

const emailValidator = require("deep-email-validator")

// FaunaDB APIs
const {
  Create,
  Collection,
  Call,
  Function: Func,
} = require("faunadb").query;

// constants
const COLLECTION_NAME = "users";
// custom function of function made in FaunaDB
const getUserByEmailFunction = (email) => {
  return Call(Func("getUserByEmail"), email);
};

// JWT & secret
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchuser");
const JWT_SECRET = process.env.JWT_SECRET;

// Create a user
router.post("/create-user", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await argon2.hash(password);

  // check if email exist of mailbox or not ( gmail ac checker )
  const validationData = await emailValidator.validate(email)
  const typoValidation = validationData.validators.typo
  if (typoValidation.valid === false ) {
    const errorReason = validationData.validators.regex.reason || typoValidation.reason
    return res.status(400).json({message: errorReason})
  }
  // console.log(email, validationData)
  const isValidEmail = validationData.valid
  if (!isValidEmail){
    return res.status(400).json({message: "Invalid gmail account. Use a valid gmail account"})
  }

  
  // check user exist in Database or not
  try {
    const userExistResponse = await client.query(getUserByEmailFunction(email));
    return res.status(422).json({
      message: "User with that email is already registered in our Database",
    });
  } catch (err) {
    // user didn't exist
    try {
      const createdUser = await client.query(
        Create(Collection(COLLECTION_NAME), {
          data: { email, password: hashedPassword },
        })
      );
      // Sending a JSON response with the user data
      return res.status(200).json({
        message: "Successfully Created A New User",
        email,
        id: createdUser.ref.id,
      });
    } catch (error) {
      console.log(error);
      // Sending an error response as JSON
      res.status(500).json({
        message: "Server Error Occurred! Couldn't create a user",
        error: error.message, // You can include more specific error information if needed
      });
    }
  }
});

// for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const loggedInUser = await client.query(getUserByEmailFunction(email));
    const { password: hashedPassword } = loggedInUser.data;
    const passwordMatch = await argon2.verify(hashedPassword, password);

    if (passwordMatch) {
      // signing JWT token
      const data = { user: { id: loggedInUser.ref.id } };
      const authToken = jwt.sign(data, JWT_SECRET, {expiresIn: '7d'});
      // removing token if already present
      res.clearCookie('token')
      // token in cookie
      res.cookie('token', authToken, { path: '/api', httpOnly: true, sameSite: 'None', secure: true });

    } else return res.status(403).json({ message: "Invalid Credentials" });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Invalid Credentials" });
  }

  res.status(200).json({ message: "Successfully logged in" });
});

// for getting user
router.get("/get-user", fetchUser, async (req, res) => {
  // my user ref_id from server
  // const userId = req.user.id // how? look at fetchUser
  res.json({ message: "success", ref_id: req.user.id, email: req.user.email });
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.json({ message: "You are logged Out." });
});

(module.exports = router), getUserByEmailFunction;
