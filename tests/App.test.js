const { execSync } = require("child_process");
const today = require("./generateToday");

describe("Feature test", () => {
    it("should welcome the user", () => {
        const output = execSync("node ./App.js", {
            encoding: "utf-8",
        });
        expect(output).toContain(
            "Welcome to your bank account handler, how much would you like to deposit to start?"
        );
    });
    it("should allow the user to deposit money", () => {
        const output = execSync("node ./App.js", {
            encoding: "utf-8",
            input: "1000\n",
        });
        expect(output).toContain(
            "Would you like to do anything else? Choose from: deposit, withdraw or print statement"
        );
    });
    it("should allow the user to withdraw money", () => {
        const output = execSync("node ./App.js", {
            encoding: "utf-8",
            input: "1000\nwithdraw\n500\n",
        });
        expect(output).toContain(
            "Would you like to do anything else? Choose from: deposit, withdraw or print statement"
        );
    });
    it("should allow the user to print a statement", () => {
        const output = execSync("node ./App.js", {
            encoding: "utf-8",
            input: "1000\nprint statement\n",
        });
        expect(output).toContain(
            "Would you like to do anything else? Choose from: deposit, withdraw or print statement"
        );
    });
    it("should allow the user to do multiple transactions", () => {
        const output = execSync("node ./App.js", {
            encoding: "utf-8",
            input: "1000\ndeposit\n2000\nwithdraw\n500\nprint statement\n",
        });
        expect(output).toContain(
            "Would you like to do anything else? Choose from: deposit, withdraw or print statement"
        );
    });
    it("should print the history of transactions", () => {
        const output = execSync("node ./App.js", {
            encoding: "utf-8",
            input: "1000\ndeposit\n2000\nwithdraw\n500\nprint statement\n",
        });
        expect(output).toContain(
            `date || credit || debit || balance\n${today} || || 500.00 || 2500.00\n${today} || 2000.00 || || 3000.00\n${today} || 1000.00 || || 1000.00\n`
        );
    });
    it("should throw an error if there are insufficient funds", () => {
        const output = execSync("node ./App.js", {
            encoding: "utf-8",
            input: "1000\nwithdraw\n2000\n",
        });
        expect(output).toContain("Insufficient funds");
    });
    it("should throw an error if the user tries to withdraw a negative amount", () => {
        const output = execSync("node ./App.js", {
            encoding: "utf-8",
            input: "1000\nwithdraw\n-500\n",
        });
        expect(output).toContain("Amount must be a non-zero number");
    });
    it("should throw an error if the user tries to deposit a negative amount", () => {
        const output = execSync("node ./App.js", {
            encoding: "utf-8",
            input: "-1000\n",
        });
        expect(output).toContain("Amount must be a non-zero number");
    });
});
