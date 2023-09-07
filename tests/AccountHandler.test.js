const AccountHandler = require("../src/AccountHandler");
const Transaction = require("../src/Transaction");
jest.mock("../src/Transaction");
// refactor the mock implementation method

function mockTransaction(amount, date) {
    const mockedTransactionConstructor = jest.fn();
    mockedTransactionConstructor.mockReturnValue({
        date: new Date(date),
        amount: amount,
    });
    Transaction.mockImplementation(mockedTransactionConstructor);
}

describe("AccountHandler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("initialization", () => {
        it("should have an empty history array", () => {
            const accountHandler = new AccountHandler();
            expect(accountHandler.history).toEqual([]);
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
    describe("addTransaction", () => {
        it("should add a transaction to the history", () => {
            const accountHandler = new AccountHandler();
            accountHandler.addTransaction(1000);
            expect(accountHandler.history.length).toEqual(1);
        });
    });
    describe("changeBalance", () => {
        it("should change the history with a valid positive amount", () => {
            const accountHandler = new AccountHandler();
            mockTransaction(1000, "2021-01-01");

            accountHandler.changeBalance(1000);
            expect(accountHandler.history[0].amount).toEqual(1000);
        });
        it("should change the history with a valid negative amount", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            mockTransaction(-1000, "2021-01-01");
            accountHandler.changeBalance(-1000);
            expect(accountHandler.history[1].amount).toEqual(-1000);
        });
        it("should add a transaction to the history", () => {
            const accountHandler = new AccountHandler();
            mockTransaction(1000, "2021-01-01");
            accountHandler.changeBalance(1000);
            expect(accountHandler.history.length).toEqual(1);
        });
    });
    describe("print statement", () => {
        it("should instantiate a statement printer which has a print statement method", () => {
            const accountHandler = new AccountHandler();
            expect(accountHandler.printStatement).toBeDefined();
        });

        it("should return a string", () => {
            const accountHandler = new AccountHandler();
            accountHandler.changeBalance(1000);
            mockTransaction(1000, "2021-01-01");
            expect(typeof accountHandler.printStatement()).toEqual("string");
        });

        it("should return a statement with a header and a transaction", () => {
            const accountHandler = new AccountHandler();
            mockTransaction(1000, "2021-01-01");
            accountHandler.changeBalance(1000);
            expect(accountHandler.printStatement()).toEqual(
                "date || credit || debit || balance\n01-01-2021 || 1000.00 || || 1000.00\n"
            );
        });
        it("should return a statement with a header and multiple transactions", () => {
            const accountHandler = new AccountHandler();
            mockTransaction(1000, "2021-01-01");
            accountHandler.changeBalance(1000);
            mockTransaction(2000, "2021-01-02");
            accountHandler.changeBalance(2000);
            mockTransaction(-500, "2021-01-03");
            accountHandler.changeBalance(-500);
            expect(accountHandler.printStatement()).toEqual(
                "date || credit || debit || balance\n03-01-2021 || || 500.00 || 2500.00\n02-01-2021 || 2000.00 || || 3000.00\n01-01-2021 || 1000.00 || || 1000.00\n"
            );
        });
    });
});
