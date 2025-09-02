const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

mongoose
  .connect(process.env.MONGODB_URI)
  .then((connection) =>
    console.log("MongoDB connected to : ", connection.connections[0].name)
  )
  .catch((err) => console.log(err))

app.use("/api/auth", require("./routes/auth.routes.js"))
app.use("/api/posts", require("./routes/post.routes.js"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
