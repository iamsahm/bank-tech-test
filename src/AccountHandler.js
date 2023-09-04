const Transaction = require("./Transaction");
const formatDate = require("./FormatDate");

class AccountHandler {
    constructor() {
        this.history = [];
        this.balance = 0;
    }
    changeBalance(amount) {
        if (typeof amount !== "number") {
            throw new Error("Amount must be a number");
        }
        if (amount % 1 !== 0 && amount.toFixed(2) !== amount.toString()) {
            throw new Error(
                "Amount must have a resolution of no more than 2 decimal places"
            );
        }
        this.balance += amount;
        const transaction = new Transaction(
            formatDate(new Date()),
            amount,
            this.balance
        );
        this.history.push(transaction);
    }
}

module.exports = AccountHandler;
