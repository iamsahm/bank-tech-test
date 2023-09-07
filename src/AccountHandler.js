const Transaction = require("./Transaction");
const StatementPrinter = require("./StatementPrinter");

class AccountHandler {
    constructor() {
        this.history = [];
    }

    changeBalance(amount) {
        this.validateAmount(amount);
        this.addTransaction(amount);
    }

    validateAmount(amount) {
        const balance = this.history.reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);
        if (balance + amount < 0) {
            throw new Error("Insufficient funds");
        }
        if (typeof amount !== "number" || amount === 0) {
            throw new Error("Amount must be a non-zero number");
        }
        if (amount % 1 !== 0 && amount.toFixed(2) !== amount.toString()) {
            throw new Error(
                "Amount must have a resolution of no more than 2 decimal places"
            );
        }
    }

    addTransaction(amount) {
        const transaction = new Transaction(amount);
        this.history.push(transaction);
    }

    printStatement() {
        const statementPrinter = new StatementPrinter(this.history);
        return statementPrinter.returnStatement();
    }
}

module.exports = AccountHandler;
