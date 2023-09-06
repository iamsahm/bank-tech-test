const StatementPrinter = require("../src/StatementPrinter");
const Transaction = require("../src/Transaction");

jest.mock("../src/Transaction", () => {
    return jest.fn().mockImplementation(() => {
        return {
            date: new Date("2021-01-01"),
            credit: 1000,
            balance: 1000,
        };
    });
});

describe("StatementPrinter", () => {
    it("should construct with the passed in history array", () => {
        const statementPrinter = new StatementPrinter([new Transaction()]);
        expect(statementPrinter.history).toEqual([new Transaction()]);
    });
    it("should have a returnStatement method", () => {
        const statementPrinter = new StatementPrinter();
        expect(statementPrinter.returnStatement).toBeDefined();
    });
    describe("returnStatement", () => {
        it("should throw an error if the history is an empty array", () => {
            const statementPrinter = new StatementPrinter([]);
            expect(() => {
                statementPrinter.returnStatement();
            }).toThrow("You have no transactions to show");
        });
        it("should return a string", () => {
            const statementPrinter = new StatementPrinter([new Transaction()]);
            expect(typeof statementPrinter.returnStatement()).toEqual("string");
        });
    });
    describe("generateStatement", () => {
        it("should return a statement with a header and a transaction", () => {
            const statementPrinter = new StatementPrinter([new Transaction()]);
            expect(statementPrinter.returnStatement()).toEqual(
                "date || credit || debit || balance\n01-01-2021 || 1000.00 || || 1000.00\n"
            );
        });
    });
});
