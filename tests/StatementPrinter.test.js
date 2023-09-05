const StatementPrinter = require("../src/StatementPrinter");

describe("StatementPrinter", () => {
    it("should construct with the passed in history array", () => {
        const statementPrinter = new StatementPrinter([1, 2, 3]);
        expect(statementPrinter.history).toEqual([1, 2, 3]);
    });
});
