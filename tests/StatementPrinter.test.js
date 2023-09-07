const StatementPrinter = require("../src/StatementPrinter");
const Transaction = require("../src/Transaction");

jest.mock("../src/Transaction");

const transaction1 = new Transaction();
transaction1.date = new Date("2021-01-01");
transaction1.amount = 1000;
const transaction2 = new Transaction();
transaction2.date = new Date("2021-01-02");
transaction2.amount = -500;
const transaction3 = new Transaction();
transaction3.date = new Date("2021-01-03");
transaction3.amount = 2000;

describe("StatementPrinter", () => {
    it("should construct with the passed in history array", () => {
        const statementPrinter = new StatementPrinter([transaction1]);
        expect(statementPrinter.history).toEqual([transaction1]);
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
            const statementPrinter = new StatementPrinter([transaction1]);
            expect(typeof statementPrinter.returnStatement()).toEqual("string");
        });
    });
    describe("generateStatement", () => {
        it("should return a statement with a header and a transaction", () => {
            const statementPrinter = new StatementPrinter([transaction1]);
            expect(statementPrinter.returnStatement()).toEqual(
                "date || credit || debit || balance\n01-01-2021 || 1000.00 || || 1000.00\n"
            );
        });
        it("should return a statement with a header and multiple transactions", () => {
            const statementPrinter = new StatementPrinter([
                transaction1,
                transaction3,
            ]);
            expect(statementPrinter.returnStatement()).toEqual(
                "date || credit || debit || balance\n03-01-2021 || 2000.00 || || 3000.00\n01-01-2021 || 1000.00 || || 1000.00\n"
            );
        });
        it("should return correctly with withdraw and deposit transactions", () => {
            const statementPrinter = new StatementPrinter([
                transaction1,
                transaction2,
                transaction3,
            ]);
            expect(statementPrinter.returnStatement()).toEqual(
                "date || credit || debit || balance\n03-01-2021 || 2000.00 || || 2500.00\n02-01-2021 || || 500.00 || 500.00\n01-01-2021 || 1000.00 || || 1000.00\n"
            );
        });
    });
});
