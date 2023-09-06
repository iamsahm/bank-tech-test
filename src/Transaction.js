class Transaction {
    constructor(amount) {
        this.date = new Date();
        this.amount = amount;
    }
}

module.exports = Transaction;
