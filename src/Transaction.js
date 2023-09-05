class Transaction {
    constructor(amount, balance) {
        this.date = new Date();
        if (amount > 0) {
            this.credit = amount;
        }
        if (amount < 0) {
            this.debit = amount;
        }
        this.balance = balance;
    }
}

module.exports = Transaction;
