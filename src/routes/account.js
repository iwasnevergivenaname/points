var express = require("express")
var router = express.Router({mergeParams: true})
const Store = require("../models")


/* POST new transaction */
router.post("/add", function (req, res) {
  const id = req.params.id

  if (!Array.isArray(req.body)) {
    req.body = [req.body]
  }

  // add transactions from request body, and update users balance
  req.body.forEach(t => {
    Store.addTransactions(id, t)
    Store.updateBalance(id, t)
  })

  res.sendStatus(201)
})

/* POST spend points */
router.post("/spend", function (req, res) {
  let id = req.params.id

  const transaction = req.body
  const user = Store.getUser(id)
  const balance = user.balance

  // total balance for user
  const balanceSum = Object.values(balance).reduce((prev, cur) => {
    return prev + cur
  }, 0)

  // check if the user has enough available points
  if (balanceSum < transaction.points) {
    return res.json({error: "insufficient funds"})
  }

  const totals = Object.assign(...Object.keys(balance).map(k => ({[k]: 0})))

  // points left to spend
  let tleft = transaction.points
  let i = 0
  // iterate through sorted transaction list
  while (i < user.transactions.length && tleft > 0) {
    const t = user.transactions[i]
    // if this payer has a positive balance
    if (balance[t.payer] > 0) {
      // determine if payer can pay full amount, or just partial
      let toSub = Math.min(tleft, t.points)
      // remove spent points from payer
      totals[t.payer] -= toSub
      // add these pay outs to transaction list
      Store.addTransactions(id, {"payer": t.payer, "points": -toSub, "timestamp": new Date()})
      // removed points just spent from points left to spend
      tleft -= toSub
    }
    i++
  }

  res.send(totals)
})

// GET user balance
router.get("/", function (req, res) {
  let id = req.params.id
  try {
    const user = Store.getUser(id)

    const balanceSum = Object.values(user.balance).reduce((prev, cur) => {
      return prev + cur
    }, 0)

    return res.json({"points": balanceSum})
  }
  catch (error) {
    res.json({
      error: error.message,
      detail: id
    })
  }
})

module.exports = router
