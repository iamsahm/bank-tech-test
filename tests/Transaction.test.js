const Transaction = require("../src/Transaction");

describe("Transaction", () => {
    it("should construct with today's date", () => {
        //spy on Date and get what was returned from new Date in Transaction
        const mockDate = new Date("2021-01-01");
        const spy = jest
            .spyOn(global, "Date")
            .mockImplementation(() => mockDate);

        const transaction = new Transaction(1000, 1000);
        spy.mockRestore();
        const expectedObject = {
            date: mockDate,
            credit: transaction.credit,
            balance: transaction.balance,
        };
        expect(transaction).toEqual(expectedObject);
    });
    it("should construct with a credit amount", () => {
        const transaction = new Transaction(1000, 1000);
        expect(transaction.credit).toEqual(1000);
    });
    it("should construct with a debit amount", () => {
        const transaction = new Transaction(-1000, 1000);
        expect(transaction.debit).toEqual(-1000);
    });
    it("should construct with a balance", () => {
        const transaction = new Transaction(1000, 1000);
        expect(transaction.balance).toEqual(1000);
    });
});
