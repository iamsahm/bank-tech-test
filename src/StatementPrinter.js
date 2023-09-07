const formatDate = require("./FormatDate");

class StatementPrinter {
    constructor(history) {
        this.history = history;
    }
    returnStatement() {
        if (!this.history.length) {
            throw new Error("You have no transactions to show");
        }
        return this.generateStatement();
    }
    generateStatement() {
        let statement = "date || credit || debit || balance\n";
        let balance = this.history.reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);

        this.history.reverse().forEach((transaction) => {
            const date = formatDate(new Date(transaction.date));
            const formattedAmount = Math.abs(transaction.amount).toFixed(2);
            statement += `${date} || `;
            if (transaction.amount > 0) {
                statement += `${formattedAmount} || || `;
            }
            if (transaction.amount < 0) {
                statement += `|| ${formattedAmount} || `;
            }
            statement += `${balance.toFixed(2)}\n`;
            balance -= transaction.amount;
        });
        console.log("statement", statement);

        return statement;
    }
}

module.exports = StatementPrinter;
