const Transaction = require("../src/Transaction");

describe("Transaction", () => {
    it("should have a date, amount and balance", () => {
        const transaction = new Transaction("10-01-2012", 1000, 3000);
        expect(transaction.date).toEqual("10-01-2012");
        expect(transaction.credit).toEqual(1000);
        expect(transaction.balance).toEqual(3000);
    });
    it("should assign negative amount to debit", () => {
        const transaction = new Transaction("10-01-2012", -1000, 3000);
        expect(transaction.debit).toEqual(-1000);
    });
    it("should not assign negative amount to credit", () => {
        const transaction = new Transaction("10-01-2012", -1000, 3000);
        expect(transaction.credit).toBeUndefined();
    });
    it("should not assign positive amount to debit", () => {
        const transaction = new Transaction("10-01-2012", 1000, 3000);
        expect(transaction.debit).toBeUndefined();
    });
    it("should not assign positive amount to credit", () => {
        const transaction = new Transaction("10-01-2012", 1000, 3000);
        expect(transaction.credit).toEqual(1000);
    });
    it("should throw error if date is not provided", () => {
        expect(() => {
            new Transaction();
        }).toThrow("Date is required");
    });
    it("should throw error if date is invalid", () => {
        expect(() => {
            new Transaction("10-01-201", 1000, 3000);
        }).toThrow("Invalid date");
    });
});
