const AccountHandler = require("../src/AccountHandler");

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
            let today = new Date().toLocaleDateString("en-gb", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            });
            today = today.replace(/\//g, "-");
            expect(accountHandler.history[0].date).toEqual(today);
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
        it("should add a transaction with the correct date, credit and balance", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            let today = new Date().toLocaleDateString("en-gb", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
            });
            today = today.replace(/\//g, "-");
            expect(accountHandler.history[0]).toEqual({
                date: today,
                credit: 1000,
                balance: 1000,
            });
        });
        it("should throw an error if amount is not a number", () => {
            const accountHandler = new AccountHandler();
            expect(() => {
                accountHandler.changeBalance("1000");
            }).toThrow("Amount must be a number");
        });
        it("should throw an error if amount has a resolution less than a cent", () => {
            const accountHandler = new AccountHandler();
            expect(() => {
                accountHandler.changeBalance(1000.001);
            }).toThrow(
                "Amount must have a resolution of no more than 2 decimal places"
            );
        });
    });
});
