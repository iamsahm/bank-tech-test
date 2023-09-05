const readline = require("readline");
const AccountHandler = require("./src/AccountHandler");

const accountHandler = new AccountHandler();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function welcome() {
    rl.question(
        "Welcome to your bank account handler, how much would you like to deposit to start?\n",
        (input) => {
            const initialDeposit = parseFloat(input);
            if (input < 0) {
                console.log("Amount must be a non-zero number");
                welcome();
            }
            try {
                accountHandler.changeBalance(initialDeposit);
                menu();
            } catch (error) {
                console.log(error.message);
                welcome();
            }
        }
    );
}

function menu() {
    rl.question(
        "Would you like to do anything else? Choose from: deposit, withdraw or print statement\n",
        (input) => {
            const choice = input.toLowerCase();
            switch (choice) {
                case "deposit":
                case "withdraw":
                    processTransaction(choice);
                    break;
                case "print statement":
                    try {
                        console.log(accountHandler.printStatement());
                    } catch (error) {
                        console.log(error.message);
                    }
                    menu();
                    break;
                default:
                    console.log("Invalid choice, please try again");
                    menu();
            }
        }
    );
}

function processTransaction(action) {
    rl.question(`How much would you like to ${action}?\n`, (input) => {
        if (input < 0) {
            console.log("Amount must be a non-zero number");
            menu();
        }
        let amount = parseFloat(input);
        if (action == "withdraw") {
            amount = amount * -1;
        }
        try {
            accountHandler.changeBalance(amount);
            menu();
        } catch (error) {
            console.log(error.message);
            menu();
        }
    });
}

welcome();
