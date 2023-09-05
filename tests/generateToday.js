const day = new Date().toLocaleDateString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
});
const today = day.replace(/\//g, "-");

module.exports = today;
