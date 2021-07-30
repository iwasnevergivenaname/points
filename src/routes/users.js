var express = require("express")
var router = express.Router()
const Store = require("../models")

/* POST create new user */
router.post("/:id", function (req, res) {
  let id = req.params.id
  if (typeof id !== "string") {
    return res.json({
      error: "invalid id format",
      detail: id
    })
  }
  Store.createUser(id)
  res.sendStatus(201)
})

/* GET user */
router.get("/:id", function (req, res) {
  let id = req.params.id
  try {
    Store.getUser(id)
  }
  catch (error) {
    res.json({
      error: error.message,
      detail: id
    })
    return
  }
  res.sendStatus(200)
})


module.exports = router
