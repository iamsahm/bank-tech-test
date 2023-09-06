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

        this.history.reverse().forEach((transaction) => {
            const date = formatDate(new Date(transaction.date));
            statement += `${date} || `;
            if (transaction.credit) {
                statement += `${transaction.credit.toFixed(2)} || || `;
            }
            if (transaction.debit) {
                statement += `|| ${Math.abs(transaction.debit).toFixed(2)} || `;
            }
            statement += `${transaction.balance.toFixed(2)}\n`;
        });

        return statement;
    }
}

module.exports = StatementPrinter;
