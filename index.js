require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const connect_database = require("./config/db")

app.use(cors({
    origin: "*"
}))
app.use(express.json())

app.use("/api", require("./route/route"))


app.listen(process.env.PORT, () => console.log(`server is running on ${process.env.PORT}`))

connect_database()
