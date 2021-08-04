# Fetch Rewards Coding Exercise - Backend Software Engineering

Create a simple service that accepts HTTP requests and returns an appropriate response. The purpose of the web 
service is to track users "points", and ensure that their oldest points are spent before any newer points. Users can add
transactions, which are records of points being given or spent.

## Getting started
In your terminal, run `npm i` to install all dependencies. Then start the server by running 'node app.js' in the terminal,
the app should run on 'localhost:3000' 

## Endpoints

#### Users
**GET /users/:id** - returns status code 200 if that user exists.<br>
**POST /users/:id** - returns status code 201 if new user was successfully created.<br>

#### Accounts
**GET /users/:id/accounts** - returns an object displaying a users updated points balance.<br>
**POST /users/:id/accounts/add** - returns status code 201 if the transactions in the request body were successfully added to users account.<br>
**POST /users/:id/accounts/spend** - returns an object displaying how the points, specified in the request body, taken from each payer with an available balance.<br>

## Models
#### Store
**createUser** - creates a new user object.<br>
**getUser(id)** - returns specified user object.<br>
**addTransactions(id, transactions)** - populates transaction list on user object with new transactions.<br>
**updateBalance(id, transactions)** - updates balance on user object to reflect points credited or debited.<br>

## Issues Encountered
The first thing I noticed when reading through the problem guidelines was the "rule" of spending the points with the 
oldest timestamp before newer points. This was an apparent issue as I knew my transactions would not necessarily be 
inputted in chronological order. To accurately spend points, I needed to start at the oldest transactions.
I solved this issue by creating a binary sort method, which is used to ensure that transactions are stored in 
chronological order, even if received out of order.<br><br>

Building off of the idea that the oldest transactions have priority when it comes to spending points, I also knew I needed
to maintain an accurate depiction of each payers total balance with the user. This is because a newer transaction 
could have spent points from an older transaction already, and therefor those points are not actually available to be 
spent at this time. I solved that by creating an updateBalance method, which updates the user objects balance object. 
This becomes useful by comparing the payers balance with the requested points amount, if the payers balance is too low, we will not 
take more points than they can provide, ie no payer has negative points.<br><br>

After writing the functionality to sort transactions and spend points accurately, I realized that it would be important
to keep the transactions list up-to-date, which includes adding any spending that might be done. This became a slight issue,
as I originally had my updateBalance logic inside of my addTransaction method. This caused the balance to become inaccurate 
with one too many updates. It was a simple fix to separate updateBalance from addTransactions, and then I utilize only 
addTransactions to record the latest point spending, without updating the already current balance.

