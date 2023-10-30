const cors = require("cors")
const app = require("express")()
require('dotenv').config()

const port = process.env.PORT || 8080

app.use(cors())

app.get("/", (req, res) =>{
    res.send("Very minimal setup")
})

app.listen(port, () => console.log("SERVER is running in the port", port))