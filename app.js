var express = require("express")
var logger = require("morgan")

var usersRouter = require("./src/routes/users")
var accountRouter = require("./src/routes/account")

var app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/users", usersRouter)
app.use("/users/:id/accounts", accountRouter)

app.listen(3000, () => {
  console.log()
})

module.exports = app
