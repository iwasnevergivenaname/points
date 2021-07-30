// define basic user class, payer, points, timestamp

class Store {
  constructor() {
    this.users = {}
  }

  // create new user
  createUser = (username) => {
    if (this.users[username]) {
      throw new Error("User already exists")
    }

    this.users[username] = {
      username: username,
      balance: {},
      transactions: []
    }
  }

  // get existing user
  getUser(username) {
    if (!this.users[username]) {
      throw Error("User not found")
    }

    return this.users[username]
  }

  // add transaction to user
  addTransactions(id, transaction) {
    const user = this.getUser(id)

      // make sure the timestamp given is in timestamp format
      transaction.timestamp = new Date(transaction.timestamp)
      // use epoch to compare timestamp values
      const i = binarySearch(user.transactions, transaction.timestamp.valueOf())

      // rearrange transaction list
      if (i > -1) {
        user.transactions.splice(i + 1, 0, transaction)
      }
      else {
        user.transactions.splice(0, 0, transaction)
      }
  }

  // update users balance
  updateBalance(id, transaction) {
    const {payer, points} = transaction
    const user = this.getUser(id)
    if (!user.balance[payer]) {
      user.balance[payer] = 0
    }
    user.balance[payer] += points
  }
}

// binary search function, used to sort transactions from oldest to newest timestamp
const binarySearch = (l, v) => {
  if (l.length === 0) {
    return 0
  }

  let lo = 0
  let hi = l.length - 1

  let last = -1

  while (lo <= hi) {
    let mid = lo + Math.floor((hi - lo) / 2)
    if (l[mid].timestamp.valueOf() <= v) {
      if (l[mid].timestamp.valueOf() === v) {
        last = mid
      }
      lo = mid + 1
    }
    else [
      hi = mid - 1
    ]
  }
  return last > -1 ? last : hi
}


module.exports = new Store()