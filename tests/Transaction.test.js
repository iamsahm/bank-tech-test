const Transaction = require("../src/Transaction");

describe("Transaction", () => {
    it("should construct with a date", () => {
        const mockDate = new Date("2021-01-01");
        const spy = jest
            .spyOn(global, "Date")
            .mockImplementation(() => mockDate);

        const transaction = new Transaction(1000);
        spy.mockRestore();
        const expectedObject = {
            date: mockDate,
            amount: 1000,
        };
        expect(transaction).toEqual(expectedObject);
    });
    it("should construct with a credit amount", () => {
        const transaction = new Transaction(1000);
        expect(transaction.amount).toEqual(1000);
    });
    it("should construct with a debit amount", () => {
        const transaction = new Transaction(-1000);
        expect(transaction.amount).toEqual(-1000);
    });
});
