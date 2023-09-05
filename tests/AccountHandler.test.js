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
        it("should throw an error for three decimal places", () => {
            const accountHandler = new AccountHandler();
            expect(() => {
                accountHandler.validateAmount(1000.001);
            }).toThrow(
                "Amount must have a resolution of no more than 2 decimal places"
            );
        });
        it("should throw an error if the balance with the amount is less than zero", () => {
            const accountHandler = new AccountHandler();
            expect(() => {
                accountHandler.validateAmount(-1000);
            }).toThrow("Insufficient funds");
        });
    });
    describe("updateBalance", () => {
        it("should update the balance with a positive amount", () => {
            const accountHandler = new AccountHandler();
            accountHandler.updateBalance(1000);
            expect(accountHandler.balance).toEqual(1000);
        });
        it("should update the balance with a negative amount", () => {
            const accountHandler = new AccountHandler();
            accountHandler.updateBalance(-1000);
            expect(accountHandler.balance).toEqual(-1000);
        });
    });
    describe("addTransaction", () => {
        it("should add a transaction to the history", () => {
            const accountHandler = new AccountHandler();
            accountHandler.addTransaction(1000);
            expect(accountHandler.history.length).toEqual(1);
        });
    });
    describe("changeBalance", () => {
        it("should change the balance with a valid positive amount", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            expect(accountHandler.balance).toEqual(1000);
        });
        it("should change the balance with a valid negative amount", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            accountHandler.changeBalance(-1000);
            expect(accountHandler.balance).toEqual(0);
        });
        it("should add a transaction to the history", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            expect(accountHandler.history.length).toEqual(1);
        });
    });
    // describe("print statement", () => {
    //     it("should instantiate a statement printer", () => {
    //         const accountHandler = new AccountHandler();
    //         accountHandler.printStatement();
    //         expect(accountHandler.statementPrinter).toBeInstanceOf(
    //             StatementPrinter
    //         );
    //     });
    // });
});
