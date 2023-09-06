class Transaction {
    constructor(amount) {
        this.date = new Date();
        if (amount > 0) {
            this.credit = amount;
        }
        if (amount < 0) {
            this.debit = amount;
        }
    }
}

module.exports = Transaction;
