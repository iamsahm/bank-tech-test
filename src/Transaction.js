class Transaction {
    constructor(date, amount, balance) {
        if (!date) {
            throw new Error("Date is required");
        }
        if (!/^\d{2}-\d{2}-\d{4}$/.test(date)) {
            throw new Error("Invalid date");
        }
        this.date = date;
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
