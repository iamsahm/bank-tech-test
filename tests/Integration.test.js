const AccountHandler = require("../src/AccountHandler");
const formatDate = require("../src/FormatDate");
today = formatDate(new Date());

describe("AccountHandler", () => {
    it("should take a deposit, withdrawal and print statement", () => {
        const accountHandler = new AccountHandler();
        accountHandler.changeBalance(1000);
        accountHandler.changeBalance(-500);

        expect(accountHandler.printStatement()).toEqual(
            `date || credit || debit || balance\n${today} || || 500.00 || 500.00\n${today} || 1000.00 || || 1000.00\n`
        );
    });
    it("should throw an error when withdrawing more than the balance", () => {
        const accountHandler = new AccountHandler();
        expect(() => {
            accountHandler.changeBalance(-500);
        }).toThrow("Insufficient funds");
    });
    it("should list multiple transactions with the calculated balance", () => {
        const accountHandler = new AccountHandler();
        accountHandler.changeBalance(1000);
        accountHandler.changeBalance(-500);
        accountHandler.changeBalance(250);
        accountHandler.changeBalance(-500);
        expect(accountHandler.printStatement()).toEqual(
            `date || credit || debit || balance\n${today} || || 500.00 || 250.00\n${today} || 250.00 || || 750.00\n${today} || || 500.00 || 500.00\n${today} || 1000.00 || || 1000.00\n`
        );
    });
});
