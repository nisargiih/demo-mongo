require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const connect_database = require("./config/db")

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use("/api", require("./route/route"))


app.use((error, req, res, next) => {
    return res.status(422).json({
        status: false,
        message: error?.message || "Something went wrong"
    })
})

app.listen(process.env.PORT, () => console.log(`server is running on ${process.env.PORT}`))

connect_database()
