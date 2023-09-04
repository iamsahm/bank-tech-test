const Transaction = require("./Transaction");
const formatDate = require("./FormatDate");

class AccountHandler {
    constructor() {
        this.history = [];
        this.balance = 0;
    }
    changeBalance(amount, date) {
        if (date == undefined) {
            date = formatDate(new Date());
        }
        if (typeof amount !== "number" || amount === 0) {
            throw new Error("Amount must be a non-zero number");
        }
        if (amount % 1 !== 0 && amount.toFixed(2) !== amount.toString()) {
            throw new Error(
                "Amount must have a resolution of no more than 2 decimal places"
            );
        }
        if (this.balance + amount < 0) {
            throw new Error("Insufficient funds");
        }
        this.balance += amount;
        const transaction = new Transaction(date, amount, this.balance);
        this.history.push(transaction);
    }
}

module.exports = AccountHandler;
