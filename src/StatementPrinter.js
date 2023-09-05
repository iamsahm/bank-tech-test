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
            statement += `${transaction.date} || `;
            if (transaction.credit) {
                statement += `${transaction.credit.toFixed(2)} || || `;
            }
            if (transaction.debit) {
                statement += `|| ${Math.abs(transaction.debit).toFixed(2)} || `;
            }
            statement += `${transaction.balance.toFixed(2)}\n`;
        });
        console.log(statement);

        return statement;
    }
}

module.exports = StatementPrinter;
