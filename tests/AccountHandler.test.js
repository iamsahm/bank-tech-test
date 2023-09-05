const AccountHandler = require("../src/AccountHandler");
const formatDate = require("../src/FormatDate");

describe("AccountHandler", () => {
    describe("initialization", () => {
        it("should have an empty history array", () => {
            const accountHandler = new AccountHandler();
            expect(accountHandler.history).toEqual([]);
        });
        it("should have a balance of 0", () => {
            const accountHandler = new AccountHandler();
            expect(accountHandler.balance).toEqual(0);
        });
    });
    describe("validateAmount", () => {
        it("should throw an error if amount is not a number", () => {
            const accountHandler = new AccountHandler();
            expect(() => {
                accountHandler.validateAmount("nan");
            }).toThrow("Amount must be a non-zero number");
        });
    });

    describe("deposit", () => {
        it("should add a transaction to the history", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            expect(accountHandler.history.length).toEqual(1);
        });
        it("should increase the balance", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            expect(accountHandler.balance).toEqual(1000);
        });
        it("should add a transaction with the correct date", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            expect(accountHandler.history[0].date).toEqual(
                formatDate(new Date())
            );
        });
        it("should add a transaction with the correct credit", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            expect(accountHandler.history[0].credit).toEqual(1000);
        });
        it("should add a transaction with the correct balance", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            expect(accountHandler.history[0].balance).toEqual(1000);
        });
        it("should add the correct date, credit and balance", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            expect(accountHandler.history[0]).toEqual({
                date: formatDate(new Date()),
                credit: 1000,
                balance: 1000,
            });
        });
        it("should throw an error if amount is not a number", () => {
            const accountHandler = new AccountHandler();
            expect(() => {
                accountHandler.changeBalance("1000");
            }).toThrow("Amount must be a non-zero number");
        });
        it("throws error with less than a cent resolution", () => {
            const accountHandler = new AccountHandler();
            expect(() => {
                accountHandler.changeBalance(1000.001);
            }).toThrow(
                "Amount must have a resolution of no more than 2 decimal places"
            );
        });
        it("should throw an error if the amount is zero", () => {
            const accountHandler = new AccountHandler();
            expect(() => {
                accountHandler.changeBalance(0);
            }).toThrow("Amount must be a non-zero number");
        });
        it("accepts a date as a second argument", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000, "10-01-2012");
            expect(accountHandler.history[0].date).toEqual("10-01-2012");
        });
        it("should calculate balance after two deposits", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            accountHandler.changeBalance(2000);
            expect(accountHandler.balance).toEqual(3000);
        });
    });
    describe("withdrawal", () => {
        it("should update balance after withdrawal", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            accountHandler.changeBalance(-500);
            expect(accountHandler.balance).toEqual(500);
        });
        it("should throw an error if there are insufficient funds", () => {
            const accountHandler = new AccountHandler();
            expect(() => {
                accountHandler.changeBalance(-500);
            }).toThrow("Insufficient funds");
        });
    });
    describe("print statement", () => {
        it("should print a statement with a header", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000, "10-01-2012");
            expect(accountHandler.printStatement()).toEqual(
                "date || credit || debit || balance\n10-01-2012 || 1000.00 || || 1000.00\n"
            );
        });
        it("should print a statement with a header and two transactions", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000, "10-01-2012");
            accountHandler.changeBalance(2000, "13-01-2012");
            expect(accountHandler.printStatement()).toEqual(
                "date || credit || debit || balance\n13-01-2012 || 2000.00 || || 3000.00\n10-01-2012 || 1000.00 || || 1000.00\n"
            );
        });
        it("should print according to the user story supplied in task.md", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000, "10-01-2023");
            accountHandler.changeBalance(2000, "13-01-2023");
            accountHandler.changeBalance(-500, "14-01-2023");
            expect(accountHandler.printStatement()).toEqual(
                "date || credit || debit || balance\n14-01-2023 || || 500.00 || 2500.00\n13-01-2023 || 2000.00 || || 3000.00\n10-01-2023 || 1000.00 || || 1000.00\n"
            );
        });
        it("should throw an error if there are no transactions", () => {
            const accountHandler = new AccountHandler();
            expect(() => {
                accountHandler.printStatement();
            }).toThrow("You have no transactions to show");
        });
        it("should throw an error if there is a corrupted transaction", () => {
            const accountHandler = new AccountHandler();
            accountHandler.history.push({
                date: "garbled",
                credit: 1000,
                balance: 1000,
            });
        });
    });
});
