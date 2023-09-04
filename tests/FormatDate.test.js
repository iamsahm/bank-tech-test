const formatDate = require("../src/FormatDate");

describe("FormatDate", () => {
    it("should return a date in the correct format", () => {
        const date = new Date("2021-01-01");
        expect(formatDate(date)).toEqual("01-01-2021");
    });
});
